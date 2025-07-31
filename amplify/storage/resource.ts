import { defineStorage } from "@aws-amplify/backend";

export const chafanaStorage = defineStorage({
  name: "chafana-storage",

  //   isDefault: true,
  access: (allow) => ({
    "task-pictures/{entity_id}/*": [
      allow.authenticated.to(["read", "write", "delete"]),
      allow.guest.to(["read", "write", "delete"]),
    ],
  }),
});
