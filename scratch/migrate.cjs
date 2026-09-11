const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/products/din-metric-fittings.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

// Migrate structure
data.groups.forEach(group => {
    // groupImageUrl
    if (group.imageUrl) {
        group.groupImageUrl = group.imageUrl;
        delete group.imageUrl;
    }

    group.products.forEach(prod => {
        // productImageUrl
        if (prod.imageUrl) {
            prod.productImageUrl = prod.imageUrl;
            delete prod.imageUrl;
        }

        // dimensionalData
        if (prod.technicalData && prod.technicalData.rows) {
            prod.dimensionalData = prod.technicalData.rows.map(row => {
                const dim = {};
                // The interface expects tubeOD, partNo, thread
                dim.partNo = row["Part No."] || row["Part No"] || "";
                dim.tubeOD = row["Tube O.D."] || row["Tube OD"] || row["Tube"] || "";
                dim.thread = row["Thread"] || "";
                
                // Add any other keys
                for (const [k, v] of Object.entries(row)) {
                    if (k !== "Part No." && k !== "Tube O.D." && k !== "Thread") {
                        dim[k.toLowerCase()] = v;
                    }
                }
                return dim;
            });
            delete prod.technicalData;
        }
    });
});

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log("Migration complete!");
