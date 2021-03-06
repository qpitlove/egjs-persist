/* eslint-disable */
import {window} from "./browser";

export default (function(eg) {
	if (!eg || !eg.Persist) {
		return;
	}

	var GLOBAL_KEY = "KEY___persist___";
	var oldConstructor = eg.Persist.prototype;
	var isNeeded = eg.Persist.isNeeded;
	var StorageManager = eg.Persist.StorageManager;

	eg.Persist = function Persist(key, value) {
		// when called as plain method
		if (!(this instanceof Persist)) {
			if (arguments.length === 0) {
				return StorageManager.getStateByKey(GLOBAL_KEY);
			}

			if (arguments.length === 1 && typeof key !== "string") {
				var value_ = key;

				StorageManager.setStateByKey(GLOBAL_KEY, value_);
				return undefined;
			}

			if (arguments.length === 2) {
				StorageManager.setStateByKey(key, value);
			}

			return StorageManager.getStateByKey(key);
		}

		// when called as constructer
		this.key = key;
		return undefined;
	};
	eg.Persist.isNeeded = isNeeded;
	eg.Persist.prototype = oldConstructor;
	return eg.Persist;
})(window.eg);

/* eslint-enable */
