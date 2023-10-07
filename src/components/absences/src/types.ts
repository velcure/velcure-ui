export type AbsenceId = string | number;

export interface AbsenceUser {
  id: AbsenceId;
  name: string;
  email: string;
}

export type AbsenceScale = 'week' | 'month' | 'year';

export type AbsenceState = 'new' | 'approved' | 'declined';

export type Absence = {
  id: AbsenceId;
  startsAt: string | Date;
  endsAt: string | Date;
  state: AbsenceState;
  userId: AbsenceId;
};
