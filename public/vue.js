Vue.component("app-grid", {
	template: `<table class="table">
    <thead>
        <tr class="is-primary">
            <th v-for="(key, index) in columns" @click="sortBy(key)" :class="{ active: sortKey == key }">
                <span>{{labels[index]}}</span>
                <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
          </span>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="entry in filteredData">
            <td v-for="key in columns">
                {{ formatValue(entry[key], key) }}
            </td>
        </tr>
    </tbody>
</table>`,
	props: {
		data: Array,
		columns: Array,
		labels: Array,
		filterKey: String
	},
	data: function() {
		var sortOrders = {};
		this.columns.forEach(function(key) {
			sortOrders[key] = 1;
		});
		return {
			sortKey: "",
			sortOrders: sortOrders
		};
	},
	computed: {
		filteredData: function() {
			var sortKey = this.sortKey;
			var filterKey = this.filterKey && this.filterKey.toLowerCase();
			var order = this.sortOrders[sortKey] || 1;
			var data = this.data;
			if (filterKey) {
				data = data.filter(function(row) {
					return Object.keys(row).some(function(key) {
						return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
					});
				});
			}
			if (sortKey) {
				data = data.slice().sort(function(a, b) {
					a = a[sortKey];
					b = b[sortKey];
					return (a === b ? 0 : a > b ? 1 : -1) * order;
				});
			}
			return data;
		}
	},
	methods: {
		sortBy: function(key) {
			this.sortKey = key;
			this.sortOrders[key] = this.sortOrders[key] * -1;
		},
		formatValue(value, key) {
			if (key == "grossUnadjusted" || key == "grossAdjusted") {
				console.log(key);
				if (value != null) {
					return "$" + value.toLocaleString("en-US", { style: "decimal" });
				}
			} else {
				return value;
			}
		}
	}
});

var app = new Vue({
	el: "#app",
	data: {
		searchQuery: "",
		gridColumns: ["film", "studio", "grossUnadjusted", "grossAdjusted", "year"],
		gridLabels: ["Film", "Studio", "Gross", "Adjusted", "Year"],
		gridData: []
	},
	methods: {
		fetchFilmData: function() {
			var xhr = new XMLHttpRequest();
			var self = this;
			xhr.open(
				"GET",
				"https://s3-us-west-2.amazonaws.com/s.cdpn.io/47703/moviesByGross.json"
			);
			xhr.onload = function() {
				self.gridData = JSON.parse(xhr.responseText);
			};
			xhr.send();
		}
	}
});
app.fetchFilmData();
