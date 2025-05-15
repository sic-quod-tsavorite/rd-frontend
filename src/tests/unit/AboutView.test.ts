import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import AboutView from "../../views/AboutView.vue";

const wrapper = mount(AboutView);

test("AboutView renders a h1", () => {
  expect(wrapper.find("h1").exists()).toBe(true);
});

test("AboutView count function", async () => {
  const getCount = () =>
    Number(wrapper.find('[data-testid="count"]').text().replace("Count: ", ""));

  //initial count
  expect(getCount()).toBe(0);

  // increase count
  await wrapper.find('[data-testid="increase"]').trigger("click");
  expect(getCount()).toBe(1);

  // decrease count
  await wrapper.find('[data-testid="decrease"]').trigger("click");
  expect(getCount()).toBe(0);

  // add 2 then reset count
  await wrapper.find('[data-testid="increase"]').trigger("click");
  await wrapper.find('[data-testid="increase"]').trigger("click");
  expect(getCount()).toBe(2);
  await wrapper.find('[data-testid="reset"]').trigger("click");
  expect(getCount()).toBe(0);
});
