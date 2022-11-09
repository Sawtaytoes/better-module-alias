declare function setupModuleAliases(
  root: string,
  aliases: { [key: string]: string }
): void;

declare module "better-module-alias" {
  export = setupModuleAliases;
}
