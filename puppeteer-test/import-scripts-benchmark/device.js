import chalk from 'chalk';
import { sh } from './util';

async function adb (command, { device, logger }) {
  let cmd = 'adb ';
  if (device) {
    // const id = device && (device.match(/^android:(.+?)(\s\(.+\))?$/) || [])[1];
    cmd += `-s ${device.replace(/(^android:|\s\(.+\)$)/g, '')} `;
  }
  return String(await sh(cmd + command, { logger })).trim();
}

export async function getDevices ({ logger }) {
  // adb -s 123abc12 shell getprop ro.product.model
  const txt = await adb('devices', { logger });
  const devices = txt.split('\n').slice(1).map(line => {
    const [name, type] = line.split(/\t+/);
    // type is always "android"
    return { id: `android:${name}`, name, type };
  });
  for (const device of devices) {
    const model = (await adb(`shell getprop ro.product.model`, { device: device.id, logger }));
    if (model) {
      device.name = model;
      device.id += ` (${model})`;
    }
  }
  return devices;
}

export async function setupAdbPortForwarding ({ device, port = 9222, logger }) {
  logger.debug(`Setting up ADB port forwarding...`);
  return adb(`forward tcp:${port} localabstract:chrome_devtools_remote`, { device, logger });
}

export async function setupAdbReverseProxy (port, { device, logger } = {}) {
  return adb(`reverse tcp:${port} tcp:${port}`, { device, logger });
}

export async function getDeviceAddress ({ device, port = 9222, host = 'localhost', retries = 0, logger }) {
  await setupAdbPortForwarding({ device, port, logger });
  const pages = await sh(`curl ${host}:${port}/json`);
  return (JSON.parse( pages || '[]'));
}