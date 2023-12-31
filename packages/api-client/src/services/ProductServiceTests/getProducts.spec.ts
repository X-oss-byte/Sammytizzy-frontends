import { getProducts } from "../productService";
import { defaultInstance } from "../../apiService";
import { describe, expect, it, beforeEach, vi } from "vitest";

const consoleWarnSpy = vi.spyOn(console, "warn");

vi.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance;
describe("ProductService - getProducts", () => {
  const mockedPost = vi.fn();
  beforeEach(() => {
    vi.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
    consoleWarnSpy.mockImplementation(() => {});
  });
  it("should return array of products (default amount of 10)", async () => {
    mockedPost.mockResolvedValueOnce({
      data: { total: 3, elements: [1, 2, 3] },
    });

    const result = await getProducts();
    expect(result.total).toEqual(3);
    expect(result?.elements).toHaveLength(3);
    expect(mockedPost).toBeCalledTimes(1);
  });
  it("should invoke api with limit", async () => {
    mockedPost.mockResolvedValueOnce({
      data: { total: 3, data: [1, 2, 3] },
    });
    await getProducts({ p: 1, limit: 5 });
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith("/store-api/product", {
      limit: 5,
      p: 1,
    });
  });
  it("should invoke api with limit and sort", async () => {
    mockedPost.mockResolvedValueOnce({
      data: { total: 3, data: [1, 2, 3] },
    });
    await getProducts({ p: 1, limit: 75, order: "name-asc" });
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith("/store-api/product", {
      limit: 75,
      p: 1,
      order: "name-asc",
    });
  });
  // it("should show deprecation info on this method", async () => {
  //   mockedPost.mockResolvedValueOnce({
  //     data: { total: 3, data: [1, 2, 3] },
  //   });
  //   await getProducts();
  //   expect(consoleWarnSpy).toBeCalledWith(
  //     '[DEPRECATED][@shopware-pwa/shopware-6-client][getProducts] This method has been deprecated. Use "getCategoryProductsListing" instead.'
  //   );
  // });
});
