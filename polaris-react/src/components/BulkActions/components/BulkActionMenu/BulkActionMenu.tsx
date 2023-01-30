import React from 'react';

import {Popover} from '../../../Popover';
import {ActionList} from '../../../ActionList';
import {BulkActionButton} from '../BulkActionButton';
import {useToggle} from '../../../../utilities/use-toggle';
import type {MenuGroupDescriptor} from '../../../../types';

export interface BulkActionsMenuProps extends MenuGroupDescriptor {
  isNewBadgeInBadgeActions: boolean;
}

export function BulkActionMenu({
  title,
  actions,
  isNewBadgeInBadgeActions,
}: BulkActionsMenuProps) {
  const {value: isVisible, toggle: toggleMenuVisibility} = useToggle(false);

  return (
    <>
      <Popover
        active={isVisible}
        activator={
          <BulkActionButton
            disclosure="up"
            showContentInButton
            onAction={toggleMenuVisibility}
            content={title}
            indicator={isNewBadgeInBadgeActions}
            pressed={isVisible}
          />
        }
        onClose={toggleMenuVisibility}
        preferInputActivator
        preferredPosition="above"
        preferredAlignment="left"
      >
        <ActionList items={actions} onActionAnyItem={toggleMenuVisibility} />
      </Popover>
    </>
  );
}
