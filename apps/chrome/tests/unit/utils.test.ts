import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { sleep } from "../../lib/utils";

describe("sleep", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("resolves immediately for sleep(0)", async () => {
    const promise = sleep(0);
    vi.runAllTimers();
    await expect(promise).resolves.toBeUndefined();
  });

  it("resolves after specified ms", async () => {
    let resolved = false;
    const promise = sleep(50).then(() => {
      resolved = true;
    });

    expect(resolved).toBe(false);
    vi.advanceTimersByTime(49);
    await Promise.resolve(); // flush microtasks
    expect(resolved).toBe(false);

    vi.advanceTimersByTime(1);
    await promise;
    expect(resolved).toBe(true);
  });
});
