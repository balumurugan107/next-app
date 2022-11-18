import { TeamHeirarchyDocument } from 'src/store/management/team';

export const sortTeam = (teams: TeamHeirarchyDocument[]) => {
  return [...teams].sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
};
