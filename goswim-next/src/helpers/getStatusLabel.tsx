import { Status } from 'src/store/management/members';
import { Color } from 'src/types';
import Label from 'src/components/Label';
import React from 'react';

const getStatusLabel = (status: Status) => {
  let properties: { text: string; color: Color } | null;

  switch (status.toLowerCase()) {
    case 'not invited':
      properties = {
        text: 'Not Invited',
        color: 'error'
      };
      break;

    case 'invite sent':
      properties = {
        text: 'Invite Sent',
        color: 'warning'
      };
      break;

      case 'unsubscribed':
        properties = {
          text: 'Unsubscribed',
          color: 'error'
        };
        break;

    case 'coupon sent':
      properties = {
        text: 'Trial Invite Sent',
        color: 'warning'
      };
      break;

      case 'invitation accepted':
        properties = {
          text: 'Invitation Accepted',
          color: 'warning'
        };
        break;

    case 'active':
      properties = {
        text: 'Subscribed',
        color: 'success'
      };
      break;

    case 'canceled':
      properties = {
        text: 'UnSubscribed',
        color: 'error'
      };
      break;

    default:
      properties = null;
  }

  if (!properties) return null;

  const { text, color } = properties;
  return <Label color={color}>{text} </Label>;
};

export default getStatusLabel;
