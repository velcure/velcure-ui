export interface AvatarOptions {
  /**
   * The name of the person in the avatar.
   *
   * - if `src` has loaded, the name will be used as the `alt` attribute of the `img`
   * - If `src` is not loaded, the name will be used to create the initials
   */
  name?: string;
  /**
   * The image url of the `Avatar`
   */
  src?: string;
  /**
   * List of sources to use for different screen resolutions
   */
  srcSet?: string;
  /**
   * Defines loading strategy
   */
  loading?: 'eager' | 'lazy';
  /**
   * The default avatar used as fallback when `name`, and `src`
   * is not specified.
   * @type React.ReactElement
   */
  icon?: React.ReactElement;
  /**
   * Function called when image failed to load
   */
  onError?: () => void;
  /**
   * Function to get the initials to display
   */
  getInitials?: (name: string) => string;
  /**
   * Defining which referrer is sent when fetching the resource.
   * @type React.HTMLAttributeReferrerPolicy
   */
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}
