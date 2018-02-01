function action(func) {
  return (...args) => (prevRes, context) => {
    const matcher = args[func.length - 1];
    const el = findElement(matcher, prevRes, context);

    func(el, ...args);

    return el;
  }
}

const findElement = (matcher, prevRes, context) =>
  matcher ? context.element(matcher) : prevRes;

const reloadReact = () => (prevRes, context) => context.device.reloadReactNative();
const find = matcher => (prevRes, context) => findElement(matcher, prevRes, context);
const tap = action(el => el.tap());
const longPress = action(el => el.longPress());
const multiTap = action((el, times) => el.multiTap(times));
const typeText = action((el, text) => el.typeText(text));
const replaceText = action((el, text) => el.replaceText(text));
const clearText = action(el => el.clearText());

const scroll = (distance, direction, matcher) => (prevRes, context) =>
  findElement(matcher, prevRes, context).scroll(distance, direction);
const scrollTo = (edge, matcher) => (prevRes, context) =>
  findElement(matcher, prevRes, context).scrollTo(edge);
// const swipe = (direction, speed, percentage, matcher) => (prevRes, context) =>
//   findElement(matcher, prevRes, context).swipe(direction, speed, percentage);

const swipe = action((el, direction, speed, percentage) => el.swipe(direction, speed, percentage));

module.exports = {
  findElement,
  reloadReact,
  find,
  tap,
  longPress,
  multiTap,
  typeText,
  replaceText,
  clearText,
  scroll,
  scrollTo,
  swipe,
};
