import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from '#/components/popover/src';
import { cn } from '#/utilities';

export interface HoverCardProps {
  content?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const HoverCard: React.FC<HoverCardProps> = (props) => {
  const { content, children, className } = props;

  if (!content) {
    return <>{children}</>;
  }

  return (
    <Popover trigger="hover">
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverContent className={cn('p-5 flex-1 max-w-sm', className)}>
          {content}
        </PopoverContent>
      </PopoverContent>
    </Popover>
  );
};
