// Copyright (c) 2019, Dokos SAS and Contributors
// License: See license.txt

frappe.listview_settings['Payment Entry'] = {
	get_indicator: function(doc) {
		if (doc.docstatus == 1) {
			return [__(doc.status, null, "Payment Entry"), doc.status === "Reconciled" ? "green": "orange", `status,==,${doc.status}`];
		}
	},
	onload: function(list_view) {
		if (list_view.page.fields_dict.party_type) {
			list_view.page.fields_dict.party_type.get_query = function() {
				return {
					"filters": {
						"name": ["in", Object.keys(frappe.boot.party_account_types)],
					}
				};
			};
		}

		frappe.require("assets/erpnext/js/accounting_journal_adjustment.js", () => {
			list_view.page.add_actions_menu_item(
				__("Accounting Journal Adjustment"),
				() => {
					const docnames = list_view.get_checked_items(true);
					new erpnext.journalAdjustment({doctype: list_view.doctype, docnames: docnames})
				},
				true
			);
		});
	}
};