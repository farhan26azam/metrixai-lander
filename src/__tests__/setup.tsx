import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

// Mock framer-motion.
// Animation-only props are dropped rather than forwarded, otherwise React warns
// about unknown DOM attributes (e.g. initial={false}) on every rendered element.
const MOTION_PROPS = [
  "initial",
  "animate",
  "exit",
  "transition",
  "variants",
  "whileInView",
  "whileHover",
  "whileTap",
  "whileFocus",
  "whileDrag",
  "viewport",
  "layout",
  "layoutId",
  "drag",
  "onAnimationStart",
  "onAnimationComplete",
];

function stripMotionProps(props: Record<string, unknown>) {
  const rest: Record<string, unknown> = {};
  for (const key of Object.keys(props)) {
    if (!MOTION_PROPS.includes(key)) rest[key] = props[key];
  }
  return rest;
}

vi.mock("framer-motion", () => {
  const motionElement = (Tag: keyof React.JSX.IntrinsicElements) => {
    const MotionMock = ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => {
      const Component = Tag as React.ElementType;
      return <Component {...stripMotionProps(props)}>{children}</Component>;
    };
    MotionMock.displayName = `motion.${Tag}`;
    return MotionMock;
  };

  return {
    motion: {
      div: motionElement("div"),
      section: motionElement("section"),
      span: motionElement("span"),
      p: motionElement("p"),
      figure: motionElement("figure"),
      li: motionElement("li"),
    },
    AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
  };
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
