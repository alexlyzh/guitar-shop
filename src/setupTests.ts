// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

class IntersectionObserver {
  observe = jest.fn();

  disconnect = jest.fn();

  unobserve = jest.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  value: IntersectionObserver,
});

const scrollTo = jest.fn();
Object.defineProperty(window, 'scrollTo', {value: scrollTo});
