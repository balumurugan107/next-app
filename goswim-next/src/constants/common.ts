import { CourseFilterData } from 'src/store/management/courses';
import { CourseLessonFilterData } from 'src/store/management/lessons';
import { IGetSubscriptionProducts } from 'src/store/subscriptions';

export const defaultErrorMessage = 'Please try again later.';

export const BASE_URL = 'http://localhost:3000';

export enum StoreType {
  Stripe = 'STRIPE',
  Android = 'ANDROID',
  Ios = 'IOS'
}

export enum AccountType {
  COACH_OR_SWIMMING_EXPERT = 'Coach/Swimming Expert',
  SWIMMER_OR_PARENT = 'Swimmer/Parent',
  COACH = 'Coach',
  EXPERT = 'Expert',
  ATHLETE = 'Athlete',
  PARENT = 'Parent',
  SWIMMER = 'Swimmer',
  EVALUATOR = 'Evaluator',
  CONTRACT = 'Contract',
  ADMIN = 'Admin',
  UNKNOWN = 'Unknown'
}

export enum ServiceLabels {
  SETS = 'SETS',
  VIDEO_REVIEWS = 'VIDEO REVIEWS',
  LIVE_LESSONS = 'LIVE LESSONS'
}

export const serviceLabelList = [
  { name: ServiceLabels.SETS, to: '/app/management/services', tab: 'sets' },
  { name: ServiceLabels.VIDEO_REVIEWS, to: '/app/management/services', tab: 'videoReviews' },
  { name: ServiceLabels.LIVE_LESSONS, to: '/app/management/services', tab: 'privateLessons' }
];

export enum AgeType {
  AGEABOVE = 'Above 18',
  AGEBELOW = 'Below 18'
}

export enum Certificates {
  USA_SWIMMING = 'USA Swimming',
  ASCA = 'ASCA'
}

export enum TrailDuration {
  SEVEN_DAYS = '7 Days',
  THIRTY_DAYS = '30 Days'
}

export enum Rights {
  ADMIN = 'admin'
}

export enum RosterGroup {
  TEN_AND_UNDER = '10 & Under',
  ELEVEN_TO_TWELVE = '11 - 12',
  THIRTEEN_TO_FOURTEEN = '13 - 14',
  FIFTEEN_TO_SEVENTEEN = '15 - 17',
  EIGHTEEN_AND_ABOVE = '18 & above',
  MASTERS = 'Masters'
}

export enum ReviewStatus {
  VERIFIED = 'verified'
}
/**
 * Enum for RemoveProfilePicture.
 * @author Pragadeeshwaran Jayapal
 * @readonly
 * @enum {string}
 */
export enum RemoveProfilePicture {
  REMOVE = 'remove'
}

export enum Status {
  ACTIVE = 'Active',
  INACTIVE = 'In-Active',
  TRAILING = 'Trialing',
  TRIAL = 'Trial',
  INCOMPLETE = 'Incomplete',
  UNSUBSCRIBED = 'Unsubscribed',
  NOT_AVAILABLE = 'Not Available',
  NOT_INVITED = 'Not Invited'
}

export enum CustomerStatus {
  INVITE_SENT = 'Invite sent',
  UNDERSCORE = '-',
  NOT_INVITED = 'Not invited',
  RECORDNAME = 'recordName',
  ACTIVE = 'active',
  COUPON_KEY = 'coupon_key',
  COUPON_SENT = 'Coupon sent',
  YES = 'yes',
  NO = 'no',
  SUBSCRIBED = 'subscribed',
  TRIAL_INVITE_SENT = 'trial invite sent',
  UNSUBSCRIBED = 'unsubscribed',
  CANCELLED = 'canceled',
  INVITATION_ACCEPTED = 'Invitation accepted',
  TRAILING = 'trialing'
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  CANCELED = 'canceled',
  INCOMPLETE = 'incomplete',
  INCOMPLETE_EXPIRED = 'incomplete_expired',
  PAST_DUE = 'past_due',
  TRAILING = 'trialing',
  UNPAID = 'unpaid',
  CREATED = 'Created',
  PAID = 'paid',
  UNSUBSCRIBED = 'unsubscribed',
  NOT_INVITED = 'Not invited'
}

export enum Colours {
  HEAT_WAVE = 'heatWave',
  VIVID_SKY_BLUE = 'vividSkyBlue',
  BLEU_DE_FRANCE = 'bleuDeFrance',
  SUNGLOW = 'sunglow',
  PAOLO_VERONESE = 'paoloVeronese',
  TURQUOISE = 'turquoise',
  PARADISE_PINK = 'paradisePink',
  CYAN_PROCESS = 'cyanProcess',
  SAPPHIRE_BLUE = 'sapphireBlue',
  MAX_BLUE_PURPLE = 'maxBluePurple',
  FANDANGO = 'fandango',
  AMETHYST = 'amethyst'
}

export enum ColourCode {
  FANDANGO = '#B42194',
  MAX_BLUE_PURPLE = '#A8A4FA',
  HEAT_WAVE = '#FF7A00',
  TURQUOISE = '#35CAAF',
  SUNGLOW = '#FFCA46',
  SAPPHIRE_BLUE = '#16639D',
  VIVID_SKY_BLUE = '#20D2F9',
  PARADISE_PINK = '#FF0066',
  PAOLO_VERONESE = '#0D9C82',
  BLEU_DE_FRANCE = '#0082E3',
  CYAN_PROCESS = '#35B9E9',
  AMETHYST = '#9C54E4',
  SAPPHIRE_BLUE_DARK = '#5EA9C5'
}

export enum SecondaryColourCode {
  HEAT_WAVE = '#FF7A00',
  VIVID_SKY_BLUE = '#20D2F9',
  BLEU_DE_FRANCE = '#0082E3',
  SUNGLOW = '#FFCA46',
  PAOLO_VERONESE = '#0D9C82',
  TURQUOISE = '#35CAAF',
  PARADISE_PINK = '#FF0066',
  CYAN_PROCESS = '#35B9E9',
  SAPPHIRE_BLUE = '#16639D',
  MAX_BLUE_PURPLE = '#A8A4FA',
  FANDANGO = '#B42194',
  AMETHYST = '#9C54E4',
  SAPPHIRE_BLUE_DARK = '#5EA9C5'
}

/**
 * Enum for BrandColorPalette values.
 * @readonly
 * @enum {HEX}
 */
export const BrandColorPalette = {
  HEAT_WAVE_THEME: { title: Colours.HEAT_WAVE, value: ColourCode.HEAT_WAVE },
  VIVID_SKY_BLUE_THEME: { title: Colours.VIVID_SKY_BLUE, value: ColourCode.VIVID_SKY_BLUE },
  BLEU_DE_FRANCE_THEME: { title: Colours.BLEU_DE_FRANCE, value: ColourCode.BLEU_DE_FRANCE },
  SUNGLOW_THEME: { title: Colours.SUNGLOW, value: ColourCode.SUNGLOW },
  PAOLO_VERONESE_THEME: { title: Colours.PAOLO_VERONESE, value: ColourCode.PAOLO_VERONESE },
  TURQUOISE_THEME: { title: Colours.TURQUOISE, value: ColourCode.TURQUOISE },
  PARADISE_PINK_THEME: { title: Colours.PARADISE_PINK, value: ColourCode.PARADISE_PINK },
  CYAN_PROCESS_THEME: { title: Colours.CYAN_PROCESS, value: ColourCode.CYAN_PROCESS },
  SAPPHIRE_BLUE_THEME: { title: Colours.SAPPHIRE_BLUE, value: ColourCode.SAPPHIRE_BLUE },
  MAX_BLUE_PURPLE_THEME: { title: Colours.MAX_BLUE_PURPLE, value: ColourCode.MAX_BLUE_PURPLE },
  FANDANGO_THEME: { title: Colours.FANDANGO, value: ColourCode.FANDANGO },
  AMETHYST_THEME: { title: Colours.AMETHYST, value: ColourCode.AMETHYST }
};

export const defaultDateFormat = 'MM/DD/YYYY';

export const defaultDateTimeFromat = `${defaultDateFormat} hh:mm a`;

export const adminRoutes = [
  '/app/admin',
  '/app/admin/weeklythemes',
  '/app/admin/videos',
  '/app/admin/lessons',
  '/app/admin/courses',
  '/app/admin/workouts',
  '/app/admin/contracts',
  '/app/admin/statistics',
  '/app/admin/metrics',
  '/app/admin/plans',
  '/app/admin/users',
  '/app/admin/groups',
  '/app/admin/events'
];

export const subscriptionRoutes = [
  '/app/management',
  '/members',
  '/members/create',
  '/members/view',
  '/members/edit',
  '/members/checkout',
  '/app/management/services',
  '/app/management/orders',
  '/train',
  '/train/create',
  '/train/edit',
  '/train/view',
  '/lessons',
  '/courses',
  '/app/deckshots'
];

export const hideRoutesEvaluators = [
  ...adminRoutes,
  '/app/admin',
  '/members',
  '/members/create',
  '/members/view',
  '/members/edit',
  '/members/checkout',
  '/train/create',
  '/train/edit',
  '/train/view'
];

export const hideRoutesSwimmer = [
  ...adminRoutes,
  '/app/admin',
  '/members',
  '/members/create',
  'members/view',
  '/members/edit',
  '/members/checkout',
  '/app/management/services',
  '/train/create',
  '/train/edit'
];

export enum SUBSCRIPTION_ROUTES {
  'Dashboard' = '/home',
  'Members' = '/members',
  'Services' = '/app/management/services',
  'Bookings' = '/app/management/orders',
  'Groups' = '/train',
  'Account' = '/account',
  'Deckshots' = '/app/deckshots'
}

export const DEFAULT_PAGE = 0;
export const DEFAULT_LIMIT = 20;
export const DEFAULT_QUERY = '';
export const DEFAULT_LENGTH = 0;

export enum DialogType {
  INFORMATION = 'Information',
  CONFIRMATION = 'Confirmation'
}

export enum CRUD {
  DELETE = 'Delete',
  EDIT = 'Edit'
}

export enum ToggleButton {
  UPCOMING = 'upcoming',
  COMPLETED = 'completed'
}

export enum CommonKeywords {
  ALL = 'all',
  LOADING = 'loading'
}

export enum ThemeVariant {
  LITE = 'lite',
  DARK = 'dark'
}

export enum Direction {
  LEFT_TO_RIGHT = 'ltr',
  RIGHT_TO_LEFT = 'rtl'
}

export enum DateFormat {
  MONTHDATE = 'MM/DD/YYYY',
  DATEMONTH = 'DD/MM/YYYY',
  YEARMONTH = 'YYYY/MM/DD',
  MONTH_DATE = 'MM-DD-YYYY',
  DATE_MONTH = 'DD-MM-YYYY',
  YEAR_MONTH = 'YYYY-MM-DD'
}

export enum CURRENCY {
  'usd' = '$', // US Dollar
  'eur' = '€', // Euro
  'crc' = '₡', // Costa Rican Colón
  'gbp' = '£', // British Pound Sterling
  'ils' = '₪', // Israeli New Sheqel
  'inr' = '₹', // Indian Rupee
  'jpy' = '¥', // Japanese Yen
  'krw' = '₩', // South Korean Won
  'ngn' = '₦', // Nigerian Naira
  'php' = '₱', // Philippine Peso
  'pln' = 'zł', // Polish Zloty
  'pyg' = '₲', // Paraguayan Guarani
  'thb' = '฿', // Thai Baht
  'uah' = '₴', // Ukrainian Hryvnia
  'vnd' = '₫' // Vietnamese Dong
}

export const FilterRoutes = ['Members', 'Services', 'Groups'];

export const ITEM_HEIGHT = 48;
export const ITEM_PADDING_TOP = 8;

export const CustomThumbnail = '/static/images/defaultThumbnail.png';

export enum ServiceName {
  VIDEO_REVIEW = 'Video Review',
  LIVE_LESSONS = 'Live Lesson',
  WORKOUTS = 'Workout'
}

export const currency_symbols: any = {
  usd: '$', // US Dollar
  eur: '€', // Euro
  crc: '₡', // Costa Rican Colón
  gbp: '£', // British Pound Sterling
  ils: '₪', // Israeli New Sheqel
  inr: '₹', // Indian Rupee
  jpy: '¥', // Japanese Yen
  krw: '₩', // South Korean Won
  ngn: '₦', // Nigerian Naira
  php: '₱', // Philippine Peso
  pln: 'zł', // Polish Zloty
  pyg: '₲', // Paraguayan Guarani
  thb: '฿', // Thai Baht
  uah: '₴', // Ukrainian Hryvnia
  vnd: '₫' // Vietnamese Dong
};

export const getMaxPriceProduct = (list: IGetSubscriptionProducts[]) => {
  const copyList = [...list];
  const sorted = copyList.sort((a, b) =>
    a.price.price < b.price.price ? 1 : b.price.price < a.price.price ? -1 : 0
  );
  return sorted?.length > 0 ? sorted[0] : null;
};

export const getSubscribedProduct = (
  list: IGetSubscriptionProducts[],
  productId: string | undefined
) => {
  const copyList = [...list];
  const filtered = copyList?.filter(a => a.id === productId);
  return filtered?.length > 0 ? filtered[0] : null;
};
export enum VIDEO_STATUS {
  REQUESTED = 'REQUESTED',
  UPLOADED = 'UPLOADED',
  DOWNLOADED = 'DOWNLOADED',
  FAILED = 'FAILED',
  REVIEWED = 'REVIEWED',
  REFUNDED = 'REFUNDED'
}

export enum TYPES {
  COURSES = 'courses',
  LESSONS = 'lessons'
}
export const handleSearchExpertise = (
  data: CourseLessonFilterData | undefined,
  expertise?: string | null | undefined
) => {
  if (data && data?.expertise.tags && expertise) {
    let findExpertise = data?.expertise?.tags.find(
      exp => exp.toLowerCase() === expertise?.toLowerCase()
    );
    if (findExpertise) {
      return findExpertise;
    }
  }
  return 'all';
};
export const handleSearchStroke = (
  data: CourseLessonFilterData | undefined,
  stroke?: string | null | undefined
) => {
  if (data && data?.stroke.tags && stroke) {
    let findStroke = data?.stroke?.tags.find(item => item.toLowerCase() === stroke?.toLowerCase());
    if (findStroke) {
      return findStroke;
    }
  }
  return 'all strokes';
};

export const handleSearchTag = (
  data: CourseLessonFilterData | undefined,
  tag?: string | null | undefined
) => {
  if (data && data?.tags.tags && tag) {
    let findStroke = data?.tags?.tags.find(exp => exp.toLowerCase() === tag?.toLowerCase());
    if (findStroke) {
      return findStroke;
    }
  }
  return 'all';
};
