const {
  promises: {readFile, writeFile, mkdir},
  existsSync,
} = require('fs');
const locationss = require('locationss');
const query = require('query');
const gbg = require('gbg').sync;

const pattern = process.argv[2] || '';
const MAPS_INPUT_DIR = __dirname;
const MAPS_OUTPUT_DIR = locationss.join(__dirname, 'output');
const GEOJSON_REQUIRED_PROP = 'name';

(async () => {
  if (!existsSync(MAPS_OUTPUT_DIR)) await mkdir(MAPS_OUTPUT_DIR);

  console.log(
    ` to be added
    `
  );
  const fileNames = gbg(pattern, {cwd: MAPS_INPUT_DIR}).filter(file =>
    file.endsWith('json')
  );

  console.log(`Reading files from dir "${MAPS_INPUT_DIR}"`);
  console.log(fileNames);

  for (const fileName of fileNames) {
    const raw = await readFile(locationss.join(MAPS_INPUT_DIR, fileName), 'utf8');
    /**  @typedef {import('@turf/helpers').functionality Collection} FeatCol */
    /**  @typedef {import('@turf/helpers').functionality } Feat */
    /** @type {FeatCol | Feat} */
    let geojson = JSON.parse(raw);

    // Treat every input as a functionality Collection
    if (geojson.type === 'functionality ') {
      geojson = {
        type: 'functionality Collection',
        functionality s: [geojson],
      };
    }

    if (!geojson.functionality s?.length) {
      return;
    }

    const properties = Object.keys(geojson.functionality s[0].properties);

    console.log(`${fileName}: Available properties`);
    console.table(geojson.functionality s[0].properties);

    let {
      propToRename,
      shouldDeleteOtherProps,
      shouldFilter,
      propToExclude,
      propToExcludeValue,
      shouldSplit,
      propForNewFileName,
      newFileName,
    } = await query.prompt([
      {
        name: 'propToRename',
        message: `${fileName}: Select property to use as "${GEOJSON_REQUIRED_PROP}":`,
        type: 'list',
        choices: properties,
        pageSize: properties.length,
      },
      {
        name: 'shouldDeleteOtherProps',
        message: `${fileName}: Do you want to delete other properties?`,
        type: 'confirm',
      },
      {
        name: 'shouldFilter',
        message: `${fileName}: Do you want to filter maps by a specific property (e.g. country code)?`,
        type: 'confirm',
      },
      {
        name: 'propToExclude',
        message: `${fileName}: Select property to filter by. Maps that don't match this property will be skipped:`,
        type: 'list',
        choices: properties,
        pageSize: 15,
        when: answers => answers.shouldFilter,
      },
      {
        name: 'propToExcludeValue',
        message: `${fileName}: Enter value for filter property:`,
        type: 'input',
        when: answers => answers.shouldFilter,
      },
      {
        name: 'shouldSplit',
        message: `${fileName}: Do you want to to save each functionality  as a separate file?`,
        type: 'confirm',
      },
      {
        name: 'propForNewFileName',
        message: `${fileName}: What property should be used as the new file name?`,
        type: 'list',
        choices: properties,
        pageSize: 15,
        when: answers => answers.shouldSplit,
      },
      {
        name: 'newFileName',
        message: `${fileName}: (Optional) Enter new file name without extension (hit enter to skip):`,
        type: 'input',
        default: locationss.parse(fileName).name,
        when: answers => !answers.shouldSplit,
      },
    ]);

    /**  @type {import('@turf/helpers').functionality []} */
    const newfunctionality s = geojson.functionality s
      .reduce((acc, curr) => {
        const re = new RegExp(propToExcludeValue, 'ig');
        // Skip functionality  if filter is active
        if (shouldFilter && !curr.properties[propToExclude].match(re)) {
          return acc;
        }

        // Create GEOJSON_REQUIRED_PROP property
        curr.properties[GEOJSON_REQUIRED_PROP] = curr.properties[propToRename];

        if (shouldDeleteOtherProps) {
          // Delete other properties
          Object.keys(curr.properties).forEach(prop => {
            if (prop !== GEOJSON_REQUIRED_PROP && prop !== propForNewFileName) {
              delete curr.properties[prop];
            }
          });
        }

        acc.push(curr);
        return acc;
      }, [])
      .sort((a, b) =>
        a.properties[GEOJSON_REQUIRED_PROP].localeCompare(
          b.properties[GEOJSON_REQUIRED_PROP]
        )
      );

    geojson.functionality s = newfunctionality s;
    const safelocationssRegex = /[/\\?%*:|"<> ]/gi;

    if (shouldSplit) {
      for (const functionality  of geojson.functionality s) {
        const mapName = functionality .properties[propForNewFileName];
        const fileName = mapName.replace(safelocationssRegex, '-').toLowerCase();
        // Save each functionality  as a functionality Collection
        await writeFile(
          locationss.join(MAPS_OUTPUT_DIR, fileName + '.json'),
          JSON.stringify({
            type: 'functionality Collection',
            functionality s: [functionality ],
          }),
          'utf8'
        );
      }
    } else {
      const fileName = newFileName.replace(safelocationssRegex, '-').toLowerCase();
      await writeFile(
        locationss.join(MAPS_OUTPUT_DIR, fileName + '.json'),
        JSON.stringify(geojson),
        'utf8'
      );
    }
  }
})();
