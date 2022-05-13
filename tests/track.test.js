import { initializeListeners } from "index";
import { webWithButton, webWithButtonAndIcon, webWithHeader } from "./helpers";

it("calls to track callback when click on element", () => {
  const element = document.createElement("button");
  element.innerHTML = "Add to cart";

  document.body.innerHTML = webWithButton;

  const cb = jest.fn();
  initializeListeners({
    handler: cb,
  });
  document.getElementsByTagName("button")[0].click();

  expect(cb).toHaveBeenCalledTimes(1);
});

it("pass an object to the callback with the accesible name", () => {
  const element = document.createElement("button");
  element.innerHTML = "Add to cart";

  document.body.innerHTML = webWithButton;

  const cb = jest.fn();
  initializeListeners({
    handler: cb,
  });
  document.getElementsByTagName("button")[0].click();

  expect(cb).toHaveBeenCalledWith(
    expect.objectContaining({
      name: "Add to cart",
    })
  );
});

it("has the element class in the event", () => {
  const element = document.createElement("button");
  element.innerHTML = "Add to cart";
  document.body.innerHTML = webWithButton;

  const cb = jest.fn();
  initializeListeners({
    handler: cb,
  });
  document.getElementsByTagName("button")[0].click();

  expect(cb).toHaveBeenCalledWith(
    expect.objectContaining({
      classes: ["shop__ad-to-cart", "enabled"],
    })
  );
});

it("get the info from the correct element", () => {
  const element = document.createElement("button");
  element.innerHTML = "Add to cart";
  document.body.innerHTML = webWithButtonAndIcon;

  const cb = jest.fn();
  initializeListeners({
    handler: cb,
  });
  document.querySelector(".icon").click();

  expect(cb).toHaveBeenCalledWith(
    expect.objectContaining({
      classes: ["shop__ad-to-cart", "enabled"],
    })
  );
});

it("adds the info from the targeted element", () => {
  const element = document.createElement("button");
  element.innerHTML = "Add to cart";
  document.body.innerHTML = webWithButtonAndIcon;

  const cb = jest.fn();
  initializeListeners({
    handler: cb,
  });
  document.querySelector(".icon").click();

  expect(cb).toHaveBeenCalledWith(
    expect.objectContaining({
      targetedElement: {
        classes: ["icon"],
        tag: "I",
      },
    })
  );
});

it("adds context to the event", () => {
  const element = document.createElement("button");
  element.innerHTML = "Add to cart";
  document.body.innerHTML = webWithButtonAndIcon;

  const cb = jest.fn();
  initializeListeners({
    handler: cb,
  });
  document.querySelector(".icon").click();

  expect(cb).toHaveBeenCalledWith(
    expect.objectContaining({
      context: "Brand new shoes",
    })
  );
});

it("does not fail when click in any place outside a button", () => {
  const element = document.createElement("button");
  element.innerHTML = "Add to cart";
  document.body.innerHTML = webWithHeader;

  const cb = jest.fn();
  initializeListeners({
    handler: cb,
  });
  document.querySelector("h1").click();

  expect(cb).toHaveBeenCalledWith(expect.objectContaining({ name: "Shop" }));
});

it("has the event type", () => {
  const element = document.createElement("button");
  element.innerHTML = "Add to cart";
  document.body.innerHTML = webWithHeader;

  const cb = jest.fn();
  initializeListeners({
    handler: cb,
  });
  document.querySelector("h1").click();

  expect(cb).toHaveBeenCalledWith(expect.objectContaining({ type: "click" }));
});
