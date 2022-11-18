import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useGetMember = (memberId: string) => {
  const { data } = useSelector(state => state.members);
  const memberData = useMemo(() => data?.filter(datum => datum._id === memberId)[0], [
    memberId,
    data
  ]);

  return memberData;
};

export default useGetMember;
