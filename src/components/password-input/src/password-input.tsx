import { IconButton } from '#/components/button/src';
import {
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from '#/components/input/src';
import { useBoolean } from '#/hooks';
import { callAllHandlers, cn } from '#/utilities';
import { forwardRef, useCallback, useRef, useState } from 'react';
import { EyeIcon, EyeOffIcon } from './password-input-icons';

export interface PasswordInputProps extends InputProps {
  /**
   * Strength meter is enabled by default. Set to false to disable.
   * @default true
   */
  feedback?: boolean;
  /**
   * The regex used to determine if the password is medium.
   * @default '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
   */
  mediumRegex?: string;
  /**
   * The regex used to determine if the password is strong.
   * @default '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'
   */
  strongRegex?: string;
}

const defaultMediumRegex =
  '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})';

const defaultStrongRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})';

type Meter = {
  strength: 'weak' | 'medium' | 'strong';
  score: number;
};

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const {
      feedback = true,
      mediumRegex = defaultMediumRegex,
      strongRegex = defaultStrongRegex,
      ...rest
    } = props;
    const [isPasswordShown, { toggle }] = useBoolean(false);

    const mediumCheckRegExp = useRef(new RegExp(mediumRegex));
    const strongCheckRegExp = useRef(new RegExp(strongRegex));

    const [meterState, setMeterState] = useState<Meter | null>(null);

    const testStrength = (str: string) => {
      if (strongCheckRegExp.current.test(str)) return 3;
      else if (mediumCheckRegExp.current.test(str)) return 2;
      else if (str.length) return 1;

      return 0;
    };

    const onKeyUp = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
      if (feedback) {
        const value = e.currentTarget.value;

        const score = testStrength(value);
        setMeterState({
          strength: score === 1 ? 'weak' : score === 2 ? 'medium' : 'strong',
          score,
        });
      }
    }, []);

    return (
      <>
        <InputGroup>
          <Input
            ref={ref}
            type={isPasswordShown ? 'text' : 'password'}
            {...rest}
            onKeyUp={callAllHandlers(rest.onKeyUp, onKeyUp)}
          />
          <InputRightElement>
            <IconButton
              onClick={toggle}
              icon={isPasswordShown ? <EyeOffIcon /> : <EyeIcon />}
              aria-label="Show"
              variant="ghost"
              size="sm"
            />
          </InputRightElement>
        </InputGroup>
        {feedback && (
          <div className="grid grid-cols-4 gap-2 mt-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  'h-2 rounded-xl transition-colors',
                  (!meterState || meterState?.score === 0) && 'bg-gray-200',
                  meterState && i <= meterState.score
                    ? meterState.score <= 2
                      ? 'bg-red-400'
                      : meterState.score >= 4
                      ? 'bg-yellow-400'
                      : 'bg-green-400'
                    : 'bg-gray-200'
                )}
              />
            ))}
          </div>
        )}
      </>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
