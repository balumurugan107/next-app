import * as productionConfig from 'src/config/env/production';
import * as stageConfig from 'src/config/env/stage';
export let env: NodeJS.ProcessEnv | null = null;
try {
  env = process.env;
  console.info(`environment: ${env.NEXT_PUBLIC_ENVIRONMENT} ${env.NODE_ENV}`);
} catch (error) {
  console.error(`Environment cannot be initialized. Default settings used.-->${error}`);
}

const getConfig = (env: string) => {
  switch (env) {
    case 'localhost':
      return stageConfig.default;

    case 'development':
      return stageConfig.default;

    case 'stage':
      return stageConfig.default;

    default:
      return productionConfig.default;
  }
};

export default getConfig(process.env.NEXT_PUBLIC_ENVIRONMENT || process.env.NODE_ENV || ``);
