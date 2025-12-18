import * as React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
} from "@mui/material";
import type { CardProps } from "@mui/material";

export interface AppCardHeaderProps {
  title?: React.ReactNode;
  subheader?: React.ReactNode;
  action?: React.ReactNode;
}

export interface AppCardMediaProps {
  src?: string;
  alt?: string;
  component?: React.ElementType;
  props?: Record<string, unknown>;
}

export interface AppCardActionsProps {
  children?: React.ReactNode;
  disableSpacing?: boolean;
}

export interface AppCardProps extends Omit<CardProps, "children"> {
  header?: AppCardHeaderProps;
  media?: AppCardMediaProps;
  children?: React.ReactNode; // main content
  actions?: AppCardActionsProps;
  interactive?: boolean;
}

export const AppCard: React.FC<AppCardProps> = ({
  header,
  media,
  children,
  actions,
  interactive,
  sx,
  ...cardProps
}) => {
  const hasHeader = header && (header.title || header.subheader || header.action);
  const hasMedia = media && (media.src || media.component);
  const hasActions = actions && actions.children;

  return (
    <Card
      {...cardProps}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        cursor: interactive ? "pointer" : "default",
        ...sx,
      }}
    >
      {hasHeader && (
        <CardHeader
          title={header?.title}
          subheader={header?.subheader}
          action={header?.action}
        />
      )}

      {hasMedia && (
        <CardMedia
          component={media?.component ?? "img"}
          image={media?.component ? undefined : media?.src}
          src={media?.component ? media?.src : undefined}
          title={media?.alt}
          {...media?.props}
        />
      )}

      {children && <CardContent>{children}</CardContent>}

      {hasActions && (
        <CardActions disableSpacing={actions?.disableSpacing}>
          {actions?.children}
        </CardActions>
      )}
    </Card>
  );
};
