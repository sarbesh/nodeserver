

class Condition {
    /**
     * 
     * @param {String} source 
     * @param {String} path 
     * @param {String} operation 
     * @param {Object} value 
     */
    constructor(source, path, operation, value) {
        this.source = source;
        this.path = path;
        this.operation = operation;
        this.value = value;
        this.path_array = path ? path.split(".") : "";
        this.path_length = 0;
        // console.log("Condition", this);
    }

    getOperationResult(data_to_compare) {
        // console.log(this.operation, this.value, data_to_compare)
        switch (this.operation) {
            case "in":
                try {
                    if (Array.isArray(this.value) && this.value.length > 0) {
                        return this.value.includes(data_to_compare);
                    } else {
                        throw new Error("Passed operation is IN but value is not array or empty");
                    }
                } catch (error) {
                    console.log("in operation failed with error:", error);
                    throw error;
                }
            case "notin":
                try {
                    if (Array.isArray(this.value) && this.value.length > 0) {
                        return !this.value.includes(data_to_compare);
                    } else {
                        throw new Error("Passed operation is IN but value is not array or empty");
                    }
                } catch (error) {
                    console.log("notin operation failed with error:", error);
                    throw error;
                }
            case "contains":
                try {
                    if (Array.isArray(data_to_compare) && data_to_compare.length > 0) {
                        return data_to_compare.includes(this.value);
                    } else {
                        throw new Error("Passed operation contains needs array in source data")
                    }
                } catch (error) {
                    console.log("contains operation failed with error:", error);
                    throw error;
                }
            case "doesnotcontains":
                try {
                    if (Array.isArray(data_to_compare) && data_to_compare.length > 0) {
                        return !data_to_compare.includes(this.value);
                    } else {
                        throw new Error("Passed operation doesnotcontains needs array in source data")
                    }
                } catch (error) {
                    console.log("doesnotcontains operation failed with error:", error);
                    throw error;
                }
            case "containsall":
                try {
                    if (Array.isArray(data_to_compare) && data_to_compare.length > 0 && Array.isArray(this.value) && this.value.length > 0) {
                        return data_to_compare.every(x => this.value.includes(x));
                    } else {
                        throw new Error("Passed operation contacontainsallins needs array in source data")
                    }
                } catch (error) {
                    console.log("containsall operation failed with error:", error);
                    throw error;
                }
            case "containsany":
                try {
                    if (Array.isArray(data_to_compare) && data_to_compare.length > 0 && Array.isArray(this.value) && this.value.length > 0) {
                        return data_to_compare.some(x => this.value.includes(x));
                    } else {
                        throw new Error("Passed operation containsany needs array in source data")
                    }
                } catch (error) {
                    console.log("containsany operation failed with error:", error);
                    throw error;
                }
            case "doesnotcontainsall":
                try {
                    if (Array.isArray(data_to_compare) && data_to_compare.length > 0 && Array.isArray(this.value) && this.value.length > 0) {
                        return !this.value.every(x => data_to_compare.includes(x));
                    } else {
                        throw new Error("Passed operation doesnotcontainsall needs array in source data")
                    }
                } catch (error) {
                    console.log("doesnotcontainsall operation failed with error:", error);
                    throw error;
                }
            case "doesnotcontainsany":
                try {
                    if (Array.isArray(data_to_compare) && data_to_compare.length > 0 && Array.isArray(this.value) && this.value.length > 0) {
                        return !this.value.some(x => data_to_compare.includes(x));
                    } else {
                        throw new Error("Passed operation doesnotcontainsany needs array in source data")
                    }
                } catch (error) {
                    console.log("doesnotcontainsany operation failed with error:", error);
                    throw error;
                }
            case "equals":
                try {
                    return data_to_compare == this.value;
                } catch (error) {
                    console.log("equal operation failed with error:", error);
                    throw error;
                }
            case "notequals":
                try {
                    return data_to_compare != this.value;
                } catch (error) {
                    console.log("equal operation failed with error:", error);
                    throw error;
                }
            case "strictlyequals":
                try {
                    return data_to_compare === this.value;
                } catch (error) {
                    console.log("equal operation failed with error:", error);
                    throw error;
                }
            case "strictlynotequals":
                try {
                    return data_to_compare !== this.value;
                } catch (error) {
                    console.log("equal operation failed with error:", error);
                    throw error;
                }
            case "gt":
                try {
                    if (typeof (Number(data_to_compare)) == 'number' && typeof (Number(this.value)) == 'number') {
                        return data_to_compare > this.value;
                    } else {
                        throw new Error("Passed value or data is not Number")
                    }
                } catch (error) {
                    console.log("gt operation failed with error:", error);
                    throw error;
                }
            case "lt":
                try {
                    if (typeof (Number(data_to_compare)) == 'number' && typeof (Number(this.value)) == 'number') {
                        return data_to_compare < this.value;
                    } else {
                        throw new Error("Passed value or data is not Number")
                    }
                } catch (error) {
                    console.log("lt operation failed with error:", error);
                    throw error;
                }
            case "gte":
                try {
                    if (typeof (Number(data_to_compare)) == 'number' && typeof (Number(this.value)) == 'number') {
                        return data_to_compare >= this.value;
                    } else {
                        throw new Error("Passed value or data is not Number")
                    }
                } catch (error) {
                    console.log("gte operation failed with error:", error);
                    throw error;
                }
            case "lte":
                try {
                    if (typeof (Number(data_to_compare)) == 'number' && typeof (Number(this.value)) == 'number') {
                        return data_to_compare <= this.value;
                    } else {
                        throw new Error("Passed value or data is not Number")
                    }
                } catch (error) {
                    console.log("lte operation failed with error:", error);
                    throw error;
                }
            case "notgt":
                try {
                    if (typeof (Number(data_to_compare)) == 'number' && typeof (Number(this.value)) == 'number') {
                        return !data_to_compare > this.value;
                    } else {
                        throw new Error("Passed value or data is not Number")
                    }
                } catch (error) {
                    console.log("notgt operation failed with error:", error);
                    throw error;
                }
            case "notlt":
                try {
                    if (typeof (Number(data_to_compare)) == 'number' && typeof (Number(this.value)) == 'number') {
                        return !data_to_compare < this.value;
                    } else {
                        throw new Error("Passed value or data is not Number")
                    }
                } catch (error) {
                    console.log("notlt operation failed with error:", error);
                    throw error;
                }
            case "notgte":
                try {
                    if (typeof (Number(data_to_compare)) == 'number' && typeof (Number(this.value)) == 'number') {
                        !data_to_compare >= this.value;
                    } else {
                        throw new Error("Passed value or data is not Number")
                    }
                } catch (error) {
                    console.log("notgte operation failed with error:", error);
                    throw error;
                }
            case "notlte":
                try {
                    if (typeof (Number(data_to_compare)) == 'number' && typeof (Number(this.value)) == 'number') {
                        !data_to_compare <= this.value;
                    } else {
                        throw new Error("Passed value or data is not Number")
                    }
                } catch (error) {
                    console.log("notlte operation failed with error:", error);
                    throw error;
                }
        }
    }

    iterateData(data, index_to_start) {
        // console.log("iterateData", this.operation, this.value, data, this.path_array, index_to_start)
        let o = data;
        for (let i = index_to_start; i < this.path_length; i++) {
            index_to_start++;
            if (this.path_array[i] == "[ALL]" && Array.isArray(o)) {
                return o.every(x => this.iterateData(x, index_to_start));
            } else if (this.path_array[i] == "[ANY]" && Array.isArray(o)) {
                return o.some(x => this.iterateData(x, index_to_start));
            } else if (Array.isArray(o)) {
                try {
                    if (typeof (Number(this.path_array[i]))) {
                        o = o[Number(this.path_array[i])];
                    } else {
                        console.log("index needs to be number");
                    }
                } catch (error) {
                    console.log("object is array but not found index or operation", error);
                }

            } else {
                o = o[this.path_array[i]];
            }
        }
        return this.getOperationResult(o);
    }

    getConditionResult(data_to_validate) {
        let data = data_to_validate[this.source];
        // console.log("getConditionResult", this, data);
        let result = false;
        if (this.path == "" && typeof (data != "object")) {
            result = this.getOperationResult(data);
        } else if (this.path != "" && typeof (data == "object")) {
            this.path_length = this.path_array.length;
            result = this.iterateData(data, 0);
        } else if (this.path == "" && typeof (data == "object")) {
            throw new Error("Passed Source is object but Path is not defined in rule");
        } else {
            //TODO
        }
        return result;
    }

}

module.exports = Condition;