import { Button, IconButtonProps } from '#/components/button/src';
import {
  AnimationControls,
  TargetAndTransition,
  Transition,
  VariantLabels,
  Variants,
  motion,
} from 'framer-motion';

interface ToggleButtonProps extends IconButtonProps {
  isOpen: boolean;
}

const path01Variants = {
  open: { d: 'M3.06061 2.99999L21.0606 21' },
  closed: { d: 'M0 9.5L24 9.5' },
};

const path02Variants = {
  open: { d: 'M3.00006 21.0607L21 3.06064' },
  moving: { d: 'M0 14.5L24 14.5' },
  closed: { d: 'M0 14.5L15 14.5' },
};

const Path: React.FC<{
  variants: Variants;
  d?: string;
  transition?: Transition;
  animate?: boolean | TargetAndTransition | VariantLabels | AnimationControls;
}> = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

export const AppNavToggleButton = (props: ToggleButtonProps) => {
  const { isOpen, ...iconButtonProps } = props;
  return (
    <div className="text-navbar-foreground hover:text-navbar-foreground-hover">
      <Button
        variant="unstyled"
        className="inline-flex items-center"
        size="xs"
        leftIcon={
          <motion.svg
            animate={isOpen ? 'open' : 'closed'}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="stroke-current w-4 h-4"
          >
            <Path
              variants={{
                closed: { d: 'M 2 2.5 L 20 2.5' },
                open: { d: 'M 3 16.5 L 17 2.5' },
              }}
            />
            <Path
              d="M 2 9.423 L 20 9.423"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              transition={{ duration: 0.1 }}
            />
            <Path
              variants={{
                closed: { d: 'M 2 16.346 L 20 16.346' },
                open: { d: 'M 3 2.5 L 17 16.346' },
              }}
            />
          </motion.svg>
        }
        {...iconButtonProps}
      >
        Menu
      </Button>
    </div>
  );
};
