import React from 'react';
import { QuickActionsFilter } from '@/components/ui';

const StatusFilter = ({
    actions,
    activeAction,
    onActionChange,
}) => {
    return (
        <QuickActionsFilter
            actions={actions}
            activeAction={activeAction}
            onActionChange={onActionChange}
        />
    );
};

export default StatusFilter; 