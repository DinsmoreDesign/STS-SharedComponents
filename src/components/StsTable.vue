<template>

    <div>
        <div class="table-container">
            <table :class="{'table': true, 'is-striped': striped, 'is-narrow': narrow, 'is-fullwidth': fullwidth, 'is-bordered': bordered}" :id="'StsTable' + componentId">
                <caption v-if="title">
                    <h3 class="title is-3" style="margin-bottom: 1.5rem">{{ title }}</h3>
                </caption>
                <thead>
                    <tr>
                        <th v-for="(heading, index) in headings" :key="index" :colspan="heading.span" scope="col" :id=" 'table' + componentId + '-header' + index">
                            <abbr v-if="heading.abbreviation && heading.name" :title="heading.name">
                                {{ heading.abbreviation }}
                            </abbr>
                            <abbr v-else-if="heading.name">
                                {{ heading.name }}
                            </abbr>
                            <abbr v-else-if="heading.abbreviation">
                                {{ heading.abbreviation }}
                            </abbr>
                            <span v-else>
                                {{ heading }}
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in rows" :key="index">
                        <td v-for="(column, index) in row" v-html="column" :headers=" 'table' + componentId + '-header' + index" :key="index"></td>
                    </tr>
                </tbody>
                <tfoot v-if="footerItems">
                    <tr>
                        <th v-for="(item, index) in footerItems" scope="col" :key="index">
                            <abbr v-if="item.abbreviation && heading.name" :title="item.name">
                                {{ item.abbreviation }}
                            </abbr>
                            <span v-else>
                                {{ item }}
                            </span>
                        </th>
                    </tr>
                </tfoot>
                <tfoot v-else-if="footerClone">
                    <tr>
                        <th v-for="(heading, index) in headings" scope="col" :id=" 'table' + componentId + '-footer' + index" :key="index">
                            <abbr v-if="heading.abbreviation && heading.name" :title="heading.name">
                                {{ heading.abbreviation }}
                            </abbr>
                            <span v-else>
                                {{ heading }}
                            </span>
                        </th>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div v-if="dataTable && dataOptions" class="columns">

            <div v-if="dataOptions.canPrint" class="column">
                <button class="button is-fullwidth" @click="printTable">
                    <span class="icon">
                        <i class="fa fa-print" aria-hidden="true"></i>
                    </span>
                    <span>
                        Print
                    </span>
                </button>
            </div>

            <div v-if="dataOptions.canDownload" class="column">
                <button class="button is-fullwidth" @click="downloadTable">
                    <span class="icon">
                        <i class="fa fa-download" aria-hidden="true"></i>
                    </span>
                    <span>
                        Download
                    </span>
                </button>
            </div>

        </div>
    </div>

</template>




<script>
    
    import DataTable from "vanilla-datatables";

    export default {
        data() {
            return {
                componentId: this._uid,
                tableData: null,
                printName: null
            }
        },
        props: {
            title: {
                type: String,
                required: false
            },
            headings: {
                type: Array,
                required: true
            },
            rows: {
                type: Array,
                required: true
            },
            footerItems: {
                type: Array,
                required: false
            },
            footerClone: {
                type: Boolean,
                required: false,
                default: false
            },
            striped: {
                type: Boolean,
                required: false,
                default: true
            },
            narrow: {
                type: Boolean,
                required: false,
                default: false
            },
            fullwidth: {
                type: Boolean,
                required: false,
                default: true
            },
            bordered: {
                type: Boolean,
                required: false,
                default: false
            },
            dataTable: {
                type: Boolean,
                required: false,
                default: false
            },
            dataOptions: {
                type: Object,
                required: false,
                validator(value) {
                    // Build errors toggle
                    var errors = false;
                    // If canPrint or canDownload exist, check that they're boolean, if not, throw an error:
                    if (value.canPrint && typeof value.canPrint !== 'boolean') {
                        console.error('[STSTable] Error: Property "canPrint" must be a boolean value.')
                        errors = true;
                    }
                    if (value.canDownload && typeof value.canDownload !== 'boolean') {
                        console.error('[STSTable] Error: Property "canDownload" must be a boolean value.')
                        errors = true;
                    }
                    // If errors is true, show Vue error
                    if (errors) {
                        return false;
                    }
                    return true;
                }
            }
        },
        mounted() {
            // If dataTable is true, initialize it
            if (this.dataTable === true) {
                this.createTable();
            }
            // Set printable name
            if (this.title) {
                this.printName = this.title;
            } else {
                this.printName = document.title + ' - Table ' + this.componentId;
            }
        },
        beforeDestroy() {
            // Destroy table before component is unmounted, so the dataTable isn't still initialized on a data set that doesn't exist anymore
            this.destroyTable();
        },
        methods: {
            createTable() {
                // If dataTable data exists for some reason, initialize it, otherwise create a new table
                if (this.tableData) {
                    this.tableData.init();
                } else {
                    if (this.footerItems || this.footerClone) {
                        this.tableData = new DataTable('#StsTable' + this.componentId, {
                            footer: true
                        });
                    } else {
                        this.tableData = new DataTable('#StsTable' + this.componentId);
                    }
                }
            },
            destroyTable() {
                // Destroy table on DOM
                if (this.tableData) {
                    this.tableData.destroy();
                }
            },
            printTable() {
                // Open new window with dataTable's data and open print dialog
                this.tableData.print();
            },
            downloadTable() {
                // Download CSV with name defined above
                this.tableData.export({
                    type: 'csv',
                    filename: this.printName
                })
            }
        }
    }

</script>




<style lang="scss" scoped>

    @import '/node_modules/vanilla-datatables/dist/vanilla-dataTables.min.css';

</style>