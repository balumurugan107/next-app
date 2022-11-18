import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { TeamDocument } from 'src/store/management/team';

/**
 * @function
 * @since 02/06/2020
 * @name useGetTeam
 * @description To filter out particular team based on param
 * @author Pragadeeshwaran Jayapal
 * @param teamId
 */

const useGetTeam = (teamId: string) => {
  const { heirarchyTeams } = useSelector(state => state.team);
  const teamData = useMemo(() => heirarchyTeams?.filter(datum => datum._id === teamId), [
    teamId,
    heirarchyTeams
  ]);
  const teams: TeamDocument[] | any = teamData;
  if (teams) {
    return teams[0];
  }
  return '';
};

export default useGetTeam;
