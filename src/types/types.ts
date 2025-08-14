"use client";

import { VALID_NOTIFICATION_TYPES } from "./constants";

export type TNotificationType = (typeof VALID_NOTIFICATION_TYPES)[number];
