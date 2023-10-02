import { HTMLVelcureProps, velcure } from '#/components/factory';
import { forwardRef } from 'react';
import { NativeImage, NativeImageOptions } from './native-image';

export interface ImgProps extends HTMLVelcureProps<'img'>, NativeImageOptions {}

/**
 * Fallback component for most SSR users who want to use the native `img` with
 * support for velcure props
 */
export const Img = forwardRef<HTMLImageElement, ImgProps>((props, ref) => (
  <velcure.img
    ref={ref}
    as={NativeImage}
    className="velcure-image"
    {...props}
  />
));
