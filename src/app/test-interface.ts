// Interfaces are custome types defined by typescript
//https://angular.io/tutorial/first-app/first-app-lesson-04
//ng generate interface some_name
// Angular gets mad if you want this directly in ts file for some reason
export interface TestInterface {

}
export interface TestGroup {
    testgroup_id: string;
    name: string;
    description: string;
    type: string; //This was defined by me
    status?: string;
    cost?: string;
    analyte?:string;
    loinc_num?:number;
    final_report?:boolean;
    allow_more_tests?:boolean;
    used_accessioning?:boolean;
    associate_with_tg?:string;
    num_of_approvals?:number;
    tg_sequence?:number;
    worksheet?:string;
    col_order?:string;
    use_for_counts?:boolean;
}
export interface Test {
    test_id: string;
    name: string;
    description: string;
    type: string; //This was defined by me
    status?: string;
    replicate?: string;
    replica_cost?:string;
    replica_status?:boolean;
    test_num?: string;
    catagory?: string;
    entry_datetime?: string;
    final_report?: boolean;
    cost?: string;
    worksheet?:string;
    test_count?:string;
    method?:string;
    children?: [];
}

export interface Mneumonic {
    mneu_id: string;
    name: string;
    description: string;
    context: string; // Test,Test Instance, Test Replica
    value_data_type: string;
    analyte?:string;
    picklist_id?:string;
    organism_mod?:string;
    default_val?:string;
    numeric_scale?:string;
    default_unit_id?:string;
    required?:boolean;
    reportable?:boolean;
    scientific_notation?:boolean;
    value_array_size_is_variable?:boolean;
    use_for_counts?:boolean;
    default_value_array_size?:number;
    abnormal_result?:boolean;
}
// ? means that it's not a required field
// This is the one for the tree
export interface TestNode {
    name: string;
    testid?:string;
    mneumonic?:string;
    children?: TestNode[];
}
/** Flat node with expandable and level information */
export interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
}