import fs from 'fs';

async function main() {
  const res = await fetch('https://raw.githubusercontent.com/addingwell/gtm-container-web-shopify/master/template.json');
  const base = await res.json();
  
  const accountId = '6247752723';
  const containerId = '194353974';
  
  const variables = [
    {
      accountId,
      containerId,
      variableId: '1',
      name: 'GA4 - Measurement id',
      type: 'c',
      parameter: [
        { type: 'TEMPLATE', key: 'value', value: 'G-22E1Z6BZXE' }
      ],
      fingerprint: '1725280851164',
      formatValue: {}
    },
    {
      accountId,
      containerId,
      variableId: '2',
      name: 'dlv - tool',
      type: 'v',
      parameter: [
        { type: 'INTEGER', key: 'dataLayerVersion', value: '2' },
        { type: 'BOOLEAN', key: 'setDefaultValue', value: 'false' },
        { type: 'TEMPLATE', key: 'name', value: 'tool' }
      ],
      fingerprint: '1727330188174',
      formatValue: {}
    },
    {
      accountId,
      containerId,
      variableId: '3',
      name: 'dlv - language',
      type: 'v',
      parameter: [
        { type: 'INTEGER', key: 'dataLayerVersion', value: '2' },
        { type: 'BOOLEAN', key: 'setDefaultValue', value: 'false' },
        { type: 'TEMPLATE', key: 'name', value: 'language' }
      ],
      fingerprint: '1727330188175',
      formatValue: {}
    },
    {
      accountId,
      containerId,
      variableId: '4',
      name: 'dlv - file_count',
      type: 'v',
      parameter: [
        { type: 'INTEGER', key: 'dataLayerVersion', value: '2' },
        { type: 'BOOLEAN', key: 'setDefaultValue', value: 'false' },
        { type: 'TEMPLATE', key: 'name', value: 'file_count' }
      ],
      fingerprint: '1727330188176',
      formatValue: {}
    },
    {
      accountId,
      containerId,
      variableId: '5',
      name: 'dlv - output_count',
      type: 'v',
      parameter: [
        { type: 'INTEGER', key: 'dataLayerVersion', value: '2' },
        { type: 'BOOLEAN', key: 'setDefaultValue', value: 'false' },
        { type: 'TEMPLATE', key: 'name', value: 'output_count' }
      ],
      fingerprint: '1727330188177',
      formatValue: {}
    },
    {
      accountId,
      containerId,
      variableId: '6',
      name: 'dlv - page_path',
      type: 'v',
      parameter: [
        { type: 'INTEGER', key: 'dataLayerVersion', value: '2' },
        { type: 'BOOLEAN', key: 'setDefaultValue', value: 'false' },
        { type: 'TEMPLATE', key: 'name', value: 'page_path' }
      ],
      fingerprint: '1727330188178',
      formatValue: {}
    },
    {
      accountId,
      containerId,
      variableId: '7',
      name: 'dlv - page_title',
      type: 'v',
      parameter: [
        { type: 'INTEGER', key: 'dataLayerVersion', value: '2' },
        { type: 'BOOLEAN', key: 'setDefaultValue', value: 'false' },
        { type: 'TEMPLATE', key: 'name', value: 'page_title' }
      ],
      fingerprint: '1727330188179',
      formatValue: {}
    }
  ];

  const triggers = [
    {
      accountId,
      containerId,
      triggerId: '101',
      name: 'Custom Event - file_selected',
      type: 'CUSTOM_EVENT',
      customEventFilter: [
        {
          type: 'EQUALS',
          parameter: [
            { type: 'TEMPLATE', key: 'arg0', value: '{{_event}}' },
            { type: 'TEMPLATE', key: 'arg1', value: 'file_selected' }
          ]
        }
      ],
      fingerprint: '1725530927201'
    },
    {
      accountId,
      containerId,
      triggerId: '102',
      name: 'Custom Event - processing_started',
      type: 'CUSTOM_EVENT',
      customEventFilter: [
        {
          type: 'EQUALS',
          parameter: [
            { type: 'TEMPLATE', key: 'arg0', value: '{{_event}}' },
            { type: 'TEMPLATE', key: 'arg1', value: 'processing_started' }
          ]
        }
      ],
      fingerprint: '1725530927202'
    },
    {
      accountId,
      containerId,
      triggerId: '103',
      name: 'Custom Event - processing_completed',
      type: 'CUSTOM_EVENT',
      customEventFilter: [
        {
          type: 'EQUALS',
          parameter: [
            { type: 'TEMPLATE', key: 'arg0', value: '{{_event}}' },
            { type: 'TEMPLATE', key: 'arg1', value: 'processing_completed' }
          ]
        }
      ],
      fingerprint: '1725530927203'
    },
    {
      accountId,
      containerId,
      triggerId: '104',
      name: 'Custom Event - download_clicked',
      type: 'CUSTOM_EVENT',
      customEventFilter: [
        {
          type: 'EQUALS',
          parameter: [
            { type: 'TEMPLATE', key: 'arg0', value: '{{_event}}' },
            { type: 'TEMPLATE', key: 'arg1', value: 'download_clicked' }
          ]
        }
      ],
      fingerprint: '1725530927204'
    },
    {
      accountId,
      containerId,
      triggerId: '105',
      name: 'Custom Event - page_view',
      type: 'CUSTOM_EVENT',
      customEventFilter: [
        {
          type: 'EQUALS',
          parameter: [
            { type: 'TEMPLATE', key: 'arg0', value: '{{_event}}' },
            { type: 'TEMPLATE', key: 'arg1', value: 'page_view' }
          ]
        }
      ],
      fingerprint: '1725530927205'
    }
  ];

  function makeParams(params) {
    return {
      type: 'LIST',
      key: 'eventSettingsTable',
      list: params.map(([name, val]) => ({
        type: 'MAP',
        map: [
          { type: 'TEMPLATE', key: 'parameter', value: name },
          { type: 'TEMPLATE', key: 'parameterValue', value: val }
        ]
      }))
    };
  }

  const tags = [
    {
      accountId,
      containerId,
      tagId: '201',
      name: 'GA4 - Event - file_selected',
      type: 'gaawe',
      parameter: [
        { type: 'BOOLEAN', key: 'sendEcommerceData', value: 'false' },
        makeParams([
          ['tool', '{{dlv - tool}}'],
          ['language', '{{dlv - language}}'],
          ['file_count', '{{dlv - file_count}}']
        ]),
        { type: 'TEMPLATE', key: 'eventName', value: 'file_selected' },
        { type: 'TEMPLATE', key: 'measurementIdOverride', value: '{{GA4 - Measurement id}}' }
      ],
      fingerprint: '1727330422201',
      firingTriggerId: ['101'],
      tagFiringOption: 'ONCE_PER_EVENT',
      monitoringMetadata: { type: 'MAP' },
      consentSettings: { consentStatus: 'NOT_SET' }
    },
    {
      accountId,
      containerId,
      tagId: '202',
      name: 'GA4 - Event - processing_started',
      type: 'gaawe',
      parameter: [
        { type: 'BOOLEAN', key: 'sendEcommerceData', value: 'false' },
        makeParams([
          ['tool', '{{dlv - tool}}'],
          ['language', '{{dlv - language}}']
        ]),
        { type: 'TEMPLATE', key: 'eventName', value: 'processing_started' },
        { type: 'TEMPLATE', key: 'measurementIdOverride', value: '{{GA4 - Measurement id}}' }
      ],
      fingerprint: '1727330422202',
      firingTriggerId: ['102'],
      tagFiringOption: 'ONCE_PER_EVENT',
      monitoringMetadata: { type: 'MAP' },
      consentSettings: { consentStatus: 'NOT_SET' }
    },
    {
      accountId,
      containerId,
      tagId: '203',
      name: 'GA4 - Event - processing_completed',
      type: 'gaawe',
      parameter: [
        { type: 'BOOLEAN', key: 'sendEcommerceData', value: 'false' },
        makeParams([
          ['tool', '{{dlv - tool}}'],
          ['language', '{{dlv - language}}'],
          ['file_count', '{{dlv - file_count}}'],
          ['output_count', '{{dlv - output_count}}']
        ]),
        { type: 'TEMPLATE', key: 'eventName', value: 'processing_completed' },
        { type: 'TEMPLATE', key: 'measurementIdOverride', value: '{{GA4 - Measurement id}}' }
      ],
      fingerprint: '1727330422203',
      firingTriggerId: ['103'],
      tagFiringOption: 'ONCE_PER_EVENT',
      monitoringMetadata: { type: 'MAP' },
      consentSettings: { consentStatus: 'NOT_SET' }
    },
    {
      accountId,
      containerId,
      tagId: '204',
      name: 'GA4 - Event - download_clicked',
      type: 'gaawe',
      parameter: [
        { type: 'BOOLEAN', key: 'sendEcommerceData', value: 'false' },
        makeParams([
          ['tool', '{{dlv - tool}}'],
          ['language', '{{dlv - language}}']
        ]),
        { type: 'TEMPLATE', key: 'eventName', value: 'download_clicked' },
        { type: 'TEMPLATE', key: 'measurementIdOverride', value: '{{GA4 - Measurement id}}' }
      ],
      fingerprint: '1727330422204',
      firingTriggerId: ['104'],
      tagFiringOption: 'ONCE_PER_EVENT',
      monitoringMetadata: { type: 'MAP' },
      consentSettings: { consentStatus: 'NOT_SET' }
    },
    {
      accountId,
      containerId,
      tagId: '205',
      name: 'GA4 - Event - page_view (SPA)',
      type: 'gaawe',
      parameter: [
        { type: 'BOOLEAN', key: 'sendEcommerceData', value: 'false' },
        makeParams([
          ['page_path', '{{dlv - page_path}}'],
          ['page_title', '{{dlv - page_title}}'],
          ['language', '{{dlv - language}}']
        ]),
        { type: 'TEMPLATE', key: 'eventName', value: 'page_view' },
        { type: 'TEMPLATE', key: 'measurementIdOverride', value: '{{GA4 - Measurement id}}' }
      ],
      fingerprint: '1727330422205',
      firingTriggerId: ['105'],
      tagFiringOption: 'ONCE_PER_EVENT',
      monitoringMetadata: { type: 'MAP' },
      consentSettings: { consentStatus: 'NOT_SET' }
    }
  ];

  const output = {
    exportFormatVersion: 2,
    exportTime: '2026-09-30 19:00:00',
    containerVersion: {
      path: `accounts/${accountId}/containers/${containerId}/versions/0`,
      accountId,
      containerId,
      containerVersionId: '0',
      container: {
        path: `accounts/${accountId}/containers/${containerId}`,
        accountId,
        containerId,
        name: 'BreadPDF Production GTM',
        publicId: 'GTM-M6D3R3JF',
        usageContext: ['WEB'],
        fingerprint: '1725550347418',
        tagManagerUrl: `https://tagmanager.google.com/#/container/accounts/${accountId}/containers/${containerId}/workspaces?apiLink=container`,
        features: base.containerVersion.container.features,
        tagIds: ['GTM-M6D3R3JF']
      },
      tag: tags,
      trigger: triggers,
      variable: variables,
      builtInVariable: base.containerVersion.builtInVariable,
      fingerprint: '1738162394135',
      tagManagerUrl: `https://tagmanager.google.com/#/versions/accounts/${accountId}/containers/${containerId}/versions/0?apiLink=version`
    }
  };

  fs.writeFileSync('gtm-breadpdf-ga4-container-export.json', JSON.stringify(output, null, 2));
  console.log('Successfully generated gtm-breadpdf-ga4-container-export.json');
}

main().catch(console.error);
