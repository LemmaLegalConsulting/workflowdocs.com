# Administrator Guide

Manage users, permissions, and system-wide settings for Workflow Docs.

## 1. LegalServer Integration

Connect Workflow Docs to your LegalServer instance.

### Initial Setup & API Permissions
To ensure Workflow Docs functions correctly, you must properly configure an API user and grant specific permissions in LegalServer.

**Common Gotcha: Missing API Permissions**
If advocates cannot launch interviews or data fails to load, verify the following:
1. **Docassemble API Enabled**: Ensure the Docassemble module is enabled on your LegalServer site.
2. **Launch Permission**: Advocates must have the **"Generate Docassemble Interviews"** permission assigned to their user role to see and launch workflows.

### Setting up the Dedicated API User
You need a dedicated API user in LegalServer to authenticate requests from Workflow Docs:
1. Create a new User Role (e.g., "Docassemble API") and ensure all "API"-related permissions are checked.
2. Create a new User (e.g., username `docassembleapi`, Login Active: "No") assigned to this role.
3. Edit the user's profile to add the "Manage Personal Access Tokens" block.
4. Generate a Personal Access Token (labeled "Workflowdocs"). *Note: Tokens expire after one year and must be rotated.*

### Connecting the Dashboard
Once you have your API token:
1. Navigate to **Admin Settings** in the Workflow Docs dashboard.
   ![Admin Settings](/img/screenshots/find_docassemble_admin_settings.png)
2. Configure your LegalServer endpoint URL and enter the API token.

## 2. Workflow Filters

Administrators can control which interviews are visible on specific LegalServer pages by default.

- **Configure Filters**: Use **Workflow Filters** to limit visibility by case type, advocate role, or other criteria.
  ![Workflow Filters](/img/screenshots/enabling_and_removing_per_workflow_filters.png)
- **Advocate Experience**: While advocates can manually "Remove Filters" in their UI to see hidden workflows, you should configure filters so that the most relevant tools are visible by default for each case type.

## 3. Managing Permissions

Workflow Docs permissions are managed by Lemma Legal.

### Requesting Administrative Access
To request **Administrator** or **Template Author** permissions for yourself or a colleague, please send an email to [**info@lemmalegal.com**](mailto:info@lemmalegal.com) with:

1. The **email address(es)** used to log in to the server.
2. The **server name** (e.g., `app.workflowdocs.com` or your organization's dedicated host).
3. The specific roles requested (Admin or Template Author).

## 4. System Tools

- [**Template Manager**](https://app.workflowdocs.com/wfd/manager)
- [**Template Editor**](https://app.workflowdocs.com/wfd/docx-labeler)
- [**Admin Dashboard**](https://app.workflowdocs.com/wfd/admin)
