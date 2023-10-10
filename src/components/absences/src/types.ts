export type AbsenceId = string | number;

export interface AbsenceUser {
  id: AbsenceId;
  name: string;
  email: string;
}

export type AbsenceScale = 'week' | 'month' | 'year';

export type AbsenceState = 'new' | 'approved' | 'declined';

export interface Absence {
  id: AbsenceId;
  startsAt: string | Date;
  endsAt: string | Date;
  state: AbsenceState;
  userId: AbsenceId;
  absenceTypeId?: string;
}

export type AbsenceTranslateFn = (key: string) => string;

export interface AbsenceType {
  id: string;
  name: string;
  /**
   * Hex color code
   */
  color: string;
}
