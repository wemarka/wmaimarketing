
import React from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { WebhookItem } from "./types";
import { ClipboardCopy, ExternalLink, MoreHorizontal, Play, Power, Trash } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import { toast } from "sonner";

interface WebhookListProps {
  webhooks: WebhookItem[];
  onToggleWebhook: (id: string, currentStatus: boolean) => void;
  onDeleteWebhook: (id: string) => void;
  onTriggerWebhook: (id: string) => void;
}

const WebhookList: React.FC<WebhookListProps> = ({
  webhooks,
  onToggleWebhook,
  onDeleteWebhook,
  onTriggerWebhook,
}) => {
  const handleCopyUrl = (endpoint: string) => {
    navigator.clipboard.writeText(endpoint);
    toast.success("تم نسخ الرابط إلى الحافظة");
  };

  const handleOpenEndpoint = (endpoint: string) => {
    window.open(endpoint, "_blank", "noopener,noreferrer");
  };

  if (webhooks.length === 0) {
    return (
      <div className="text-center p-10 border border-dashed rounded-lg">
        <h3 className="text-lg font-medium mb-2">لا توجد ويب هوك بعد</h3>
        <p className="text-muted-foreground mb-4">قم بإنشاء ويب هوك جديد للبدء</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {webhooks.map((webhook) => (
        <Card key={webhook.id} className={webhook.active ? "" : "opacity-60"}>
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <div>
                <CardTitle className="text-lg font-bold mb-1">{webhook.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <span className="truncate">{webhook.endpoint}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 rounded-full"
                    onClick={() => handleCopyUrl(webhook.endpoint)}
                  >
                    <ClipboardCopy className="h-3 w-3" />
                  </Button>
                </CardDescription>
              </div>
              <Switch
                checked={webhook.active}
                onCheckedChange={() => onToggleWebhook(webhook.id, webhook.active)}
              />
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex flex-wrap gap-1.5">
              {webhook.eventTypes.map((eventType) => (
                <Badge key={eventType} variant="outline" className="text-xs">
                  {eventType}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2">
            <div className="text-xs text-muted-foreground">
              {webhook.lastTriggered ? (
                <span>
                  آخر تشغيل: {formatDistanceToNow(new Date(webhook.lastTriggered), { addSuffix: true, locale: ar })}
                </span>
              ) : (
                "لم يتم التشغيل بعد"
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => onTriggerWebhook(webhook.id)}>
                  <Play className="h-4 w-4 mr-2" />
                  تشغيل الآن
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleOpenEndpoint(webhook.endpoint)}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  فتح الرابط
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onToggleWebhook(webhook.id, webhook.active)}>
                  <Power className="h-4 w-4 mr-2" />
                  {webhook.active ? "تعطيل" : "تفعيل"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-destructive focus:text-destructive"
                  onClick={() => onDeleteWebhook(webhook.id)}
                >
                  <Trash className="h-4 w-4 mr-2" />
                  حذف
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default WebhookList;
