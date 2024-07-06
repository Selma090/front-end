import { Jira } from "./jira";

export class Test {
    id!: number;
    name!: string;
    priority!: string;
    test_statut!: string;
    deadline!: Date;
    isValidated?: boolean;
    validation_statut!: string;
    jiraId!: number | null;
    jira?: Jira; // Add this line to include the jira property
}
