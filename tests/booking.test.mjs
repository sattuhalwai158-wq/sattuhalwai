import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
const source = readFileSync(new URL("../src/lib/booking.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const {
  validateBooking,
  validateBookingStep,
  bookingPayload,
  createBookingSubmitter,
  indiaToday,
  initialBooking,
} = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
const valid = () => ({
  ...initialBooking,
  event: "Royal Wedding",
  date: "2099-11-20",
  city: "Ajmer",
  guests: 350,
  cuisines: ["Royal Rajasthani"],
  name: "  Test Guest  ",
  phone: "+91 98765 43210",
});
test("valid Indian enquiry passes; payload keeps original database fields and trims contact", () => {
  assert.deepEqual(validateBooking(valid(), "2026-10-28"), {});
  assert.deepEqual(bookingPayload(valid()), {
    event_type: "Royal Wedding",
    event_date: "2099-11-20",
    city: "Ajmer",
    guests: 350,
    cuisines: ["Royal Rajasthani"],
    name: "Test Guest",
    phone: "+91 98765 43210",
  });
});
test("each step validates only its visible fields", () => {
  assert.deepEqual(Object.keys(validateBookingStep({ ...initialBooking }, 1, "2026-10-28")), [
    "event",
    "date",
  ]);
  assert.deepEqual(Object.keys(validateBookingStep({ ...initialBooking }, 4, "2026-10-28")), [
    "name",
    "phone",
  ]);
});
test("past or impossible dates cannot pass final review", () => {
  for (const date of ["2026-10-27", "2099-02-30", "not-a-date", ""])
    assert.ok(validateBooking({ ...valid(), date }, "2026-10-28").date);
});
test("required preferences, invalid phones and invalid guest counts fail", () => {
  for (const phone of ["12345", "+1 212 555 1234", "abcdefghij", "0000000000", "abc9876543210"])
    assert.ok(validateBooking({ ...valid(), phone }, "2026-10-28").phone);
  for (const guests of [0, 99, 5001, NaN, 123.5])
    assert.ok(validateBooking({ ...valid(), guests }, "2026-10-28").guests);
  assert.ok(validateBooking({ ...valid(), cuisines: [] }, "2026-10-28").cuisines);
  assert.ok(validateBooking({ ...valid(), cuisines: ["Unknown"] }, "2026-10-28").cuisines);
  assert.ok(validateBooking({ ...valid(), name: " " }, "2026-10-28").name);
});
test("today uses India timezone across a UTC midnight boundary", () => {
  assert.equal(indiaToday(new Date("2026-10-27T19:00:00Z")), "2026-10-28");
});
test("duplicate submissions share no second write while pending", async () => {
  let release;
  let writes = 0;
  const submit = createBookingSubmitter(() => {
    writes++;
    return new Promise((resolve) => {
      release = resolve;
    });
  });
  const first = submit(valid());
  assert.deepEqual(await submit(valid()), { status: "duplicate" });
  assert.equal(writes, 1);
  release({ error: null });
  assert.deepEqual(await first, { status: "success" });
});
test("database error and rejected request never report success and allow a later retry", async () => {
  let writes = 0;
  const submit = createBookingSubmitter(async () => {
    writes++;
    if (writes === 1) return { error: { message: "denied" } };
    if (writes === 2) throw new Error("offline");
    return { error: null };
  });
  const data = valid();
  const snapshot = structuredClone(data);
  assert.equal((await submit(data)).status, "error");
  assert.equal((await submit(data)).status, "error");
  assert.equal((await submit(data)).status, "success");
  assert.deepEqual(data, snapshot);
});
test("invalid enquiry never reaches writer", async () => {
  let writes = 0;
  const submit = createBookingSubmitter(async () => {
    writes++;
    return { error: null };
  });
  assert.equal((await submit({ ...valid(), phone: "" })).status, "error");
  assert.equal(writes, 0);
});
