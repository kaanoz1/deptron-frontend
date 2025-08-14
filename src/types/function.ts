"use client";

import { VALID_NOTIFICATION_TYPES } from "./constants";
import { TNotificationType } from "./types";

export const isValidTNotificationType = (
    type: string,
): type is TNotificationType => {
    return VALID_NOTIFICATION_TYPES.includes(type);
};
