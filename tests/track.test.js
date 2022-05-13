import { initializeListeners } from "index";

it("calls to track callback when click on element", () => {
  const element = document.createElement("button");
  element.innerHTML = "Add to cart";

  document.body.innerHTML =
    "<div>" +
    '  <span id="username" />' +
    '  <button id="button">Add to cart</button>' +
    "</div>";

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

  document.body.innerHTML =
    "<div>" +
    '  <span id="username" />' +
    '  <button id="button">Add to cart</button>' +
    "</div>";

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
  document.body.innerHTML =
    "<div>" +
    '  <span id="username" />' +
    '  <button id="button" class="shop__ad-to-cart enabled">Add to cart</button>' +
    "</div>";

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
