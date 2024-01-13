import { OfflineStartExecutorSchema } from "./schema";

export function buildOfflineStartCustomFlags(resolvedOptions: OfflineStartExecutorSchema) {
    const albPortArgs = resolvedOptions.albPort ? ['--albPort', resolvedOptions.albPort] : [];
    const corsAllowHeadersArgs = resolvedOptions.corsAllowHeaders ? ['--corsAllowHeaders', resolvedOptions.corsAllowHeaders] : [];
    const corsAllowOriginArgs = resolvedOptions.corsAllowOrigin ? ['--corsAllowOrigin', resolvedOptions.corsAllowOrigin] : [];
    const corsDisallowCredentialsArgs = resolvedOptions.corsDisallowCredentials ? ['--corsDisallowCredentials'] : [];
    const corsExposedHeadersArgs = resolvedOptions.corsExposedHeaders ? ['--corsExposedHeaders', resolvedOptions.corsExposedHeaders] : [];
    const disableCookieValidationArgs = resolvedOptions.disableCookieValidation ? ['--disableCookieValidation'] : [];
    const dockerHostArgs = resolvedOptions.dockerHost ? ['--dockerHost', resolvedOptions.dockerHost] : [];
    const dockerHostServicePathArgs = resolvedOptions.dockerHostServicePath ? ['--dockerHostServicePath', resolvedOptions.dockerHostServicePath] : [];
    const dockerNetworkArgs = resolvedOptions.dockerNetwork ? ['--dockerNetwork', resolvedOptions.dockerNetwork] : [];
    const dockerReadOnlyArgs = resolvedOptions.dockerReadOnly ? ['--dockerReadOnly', resolvedOptions.dockerReadOnly] : [];
    const enforceSecureCookiesArgs = resolvedOptions.enforceSecureCookies ? ['--enforceSecureCookies'] : [];
    const hostArgs = resolvedOptions.host ? ['--host', resolvedOptions.host] : [];
    const httpPortArgs = resolvedOptions.httpPort ? ['--httpPort', resolvedOptions.httpPort] : [];
    const httpsProtocolArgs = resolvedOptions.httpsProtocol ? ['--httpsProtocol', resolvedOptions.httpsProtocol] : [];
    const ignoreJWTSignatureArgs = resolvedOptions.ignoreJWTSignature ? ['--ignoreJWTSignature'] : [];
    const lambdaPortArgs = resolvedOptions.lambdaPort ? ['--lambdaPort', resolvedOptions.lambdaPort] : [];
    const layersDirArgs = resolvedOptions.layersDir ? ['--layersDir', resolvedOptions.layersDir] : [];
    const localEnvironmentArgs = resolvedOptions.localEnvironment ? ['--localEnvironment'] : [];
    const noAuthArgs = resolvedOptions.noAuth ? ['--noAuth'] : [];
    const noPrependStageInUrlArgs = resolvedOptions.noPrependStageInUrl ? ['--noPrependStageInUrl'] : [];
    const noTimeoutArgs = resolvedOptions.noTimeout ? ['--noTimeout'] : [];
    const prefixArgs = resolvedOptions.prefix ? ['--prefix', resolvedOptions.prefix] : [];
    const reloadHandlerArgs = resolvedOptions.reloadHandler ? ['--reloadHandler'] : [];
    const resourceRoutesArgs = resolvedOptions.resourceRoutes ? ['--resourceRoutes'] : [];
    const terminateIdleLambdaTimeArgs = resolvedOptions.terminateIdleLambdaTime ? ['--terminateIdleLambdaTime'] : [];
    const useDockerArgs = resolvedOptions.useDocker ? ['--useDocker'] : [];
    const useInProcessArgs = resolvedOptions.useInProcess ? ['--useInProcess'] : [];
    const webSocketHardTimeoutArgs = resolvedOptions.webSocketHardTimeout ? ['--webSocketHardTimeout', resolvedOptions.webSocketHardTimeout] : [];
    const webSocketIdleTimeoutArgs = resolvedOptions.webSocketIdleTimeout ? ['--webSocketIdleTimeout', resolvedOptions.webSocketIdleTimeout] : [];
    const websocketPortArgs = resolvedOptions.websocketPort ? ['--websocketPort', resolvedOptions.websocketPort] : [];
    const customFlags = [
        ...albPortArgs,
        ...corsAllowHeadersArgs,
        ...corsAllowOriginArgs,
        ...corsDisallowCredentialsArgs,
        ...corsExposedHeadersArgs,
        ...disableCookieValidationArgs,
        ...dockerHostArgs,
        ...dockerHostServicePathArgs,
        ...dockerNetworkArgs,
        ...dockerReadOnlyArgs,
        ...enforceSecureCookiesArgs,
        ...hostArgs,
        ...httpPortArgs,
        ...httpsProtocolArgs,
        ...ignoreJWTSignatureArgs,
        ...lambdaPortArgs,
        ...layersDirArgs,
        ...localEnvironmentArgs,
        ...noAuthArgs,
        ...noPrependStageInUrlArgs,
        ...noTimeoutArgs,
        ...prefixArgs,
        ...reloadHandlerArgs,
        ...resourceRoutesArgs,
        ...terminateIdleLambdaTimeArgs,
        ...useDockerArgs,
        ...useInProcessArgs,
        ...webSocketHardTimeoutArgs,
        ...webSocketIdleTimeoutArgs,
        ...websocketPortArgs,
    ];
    return customFlags;
}