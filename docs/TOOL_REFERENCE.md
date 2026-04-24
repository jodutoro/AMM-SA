# Tool Reference

Complete catalog of all SearchAtlas MCP tool groups and operations.

> **Always use schema discovery first.** The tool names and operations below reflect the current known surface — but the MCP may expose a different or extended set depending on your account and the server version. Before calling any tool, ask Claude to list available SearchAtlas tools, or describe what you want to do and let it route correctly.
>
> **Tip:** Call any tool with `op: "help"` and `params: {}` to see its live schema.

---

## OTTO SEO (10 tool groups, ~45 operations)

### `project_management` — 13 operations
Project lifecycle, crawl settings, installation, exports.
- `list_otto_projects` — list all OTTO projects
- `get_otto_project_details` — health score, pages, issues for a project
- `find_project_by_hostname` — look up project by domain
- `engage_otto_project` — create/activate a project for a domain
- `disengage_otto_project` — deactivate a project
- `freeze_otto_project` / `unfreeze_otto_project` — pause/resume
- `update_crawl_settings` — configure crawl depth, frequency
- `verify_otto_installation` — check if OTTO pixel is installed
- `get_otto_installation_guide` — get installation instructions
- `manual_reprocess_autopilot` — re-run autopilot suggestions
- `work_summary_export` — export work summary to Google Sheet
- `list_otto_pixel_installed_projects` — list projects with pixel

### `audit_management` — 2 operations
- `create_audit` — create a new site audit
- `get_site_audit_by_id` — get audit results

### `recrawl_management` — 1 operation
- `trigger_recrawl` — force a fresh crawl

### `schema_markup` — 8 operations
- `list_page_level_schemas` / `list_domain_level_schemas` — see existing schemas
- `get_schema_detail` — view a specific schema
- `generate_page_level_schema` — AI-generate schema for a page
- `edit_page_level_schema` / `delete_page_level_schema` — modify/remove
- `deploy_page_level_schema` / `deploy_domain_level_schema` — push live

### `suggestion_management` — 4 operations
- `edit_suggestion` — approve/reject a single suggestion
- `edit_suggestions_bulk` — bulk approve/reject
- `delete_suggestion` — remove a suggestion
- `export_suggestions` — export to CSV

### `indexing_management` — 8 operations
- `get_custom_indexing_urls` / `add_custom_indexing_urls` / `delete_custom_indexing_url`
- `select_urls_for_indexing` — submit URLs for instant indexing
- `get_indexing_sitemaps` / `add_indexing_sitemap` / `delete_indexing_sitemap` / `toggle_sitemap_indexing`

### `brand_vault` — 17+ operations
Brand vault management + knowledge graph.
- `list_brand_vaults` / `create_brand_vault` / `retrieve_brand_vault_details` / `update_brand_vault`
- `archive_brand_vault` / `restore_brand_vault` / `list_archived_brand_vaults`
- `get_brand_vault_business_info` / `update_brand_vault_business_info`
- `get_brand_vault_overview` / `get_brand_vault_index_status` / `ask_brand_vault`
- `get_knowledge_graph` / `update_knowledge_graph` / `update_refine_prompt`
- `list_voice_profiles` / `list_voice_templates` / `select_voice_profile`

### `image_upload` — 1 operation
- `upload_image` — upload an image for use in OTTO

### `quota_management` — 2 operations
- `get_otto_quota` / `show_otto_quota` — check usage limits

### `seo_analysis` — 4 operations
Detailed SEO issue analysis and recommendations.
- `generate_bulk_recommendations` / `generate_single_recommendation`
- `get_project_issues_summary` / `get_website_issues_by_type`

---

## Site Explorer (8 tool groups, ~40 operations)

### `projects` — 4 operations
- `list_sites` / `create_site_explorer` / `get_site_explorer_details` / `delete_site_explorer`

### `organic` — 6 operations
- `get_organic_keywords` — top ranking keywords
- `get_organic_pages` — top pages by traffic
- `get_organic_competitors` — competitor domains
- `get_organic_position_changes` — ranking movement
- `get_organic_subdomains` — subdomain breakdown
- `get_site_indexed_pages` — indexed page count

### `backlinks` — 7 operations
- `get_site_backlinks` — all backlinks
- `get_site_referring_domains` — unique referring domains
- `get_site_referring_ips` — referring IP analysis
- `get_site_anchor_text_analysis` — anchor text distribution
- `get_site_outgoing_links` / `get_site_outgoing_domains` — external links
- `get_site_link_network_graph` — link network visualization

### `analysis` — 5 operations
- `get_historical_trends` — traffic/ranking trends over time
- `get_keyword_intent_analysis` — keyword intent classification
- `get_position_distribution` — ranking position breakdown
- `get_serp_features` — featured snippets, PAA, etc.
- `get_educational_backlinks` — .edu backlink analysis

### `adwords` — 8 operations
- `get_adwords_keywords` / `get_adwords_pages` / `get_adwords_competitors` / `get_adwords_copies`
- `get_adwords_adhistory` / `get_adwords_adtrend` / `get_adwords_position_changes` / `get_adwords_subdomains`

### `keyword_research` — 7 operations
- `list_keyword_research_projects` / `create_keyword_research_project` / `get_keyword_research_details`
- `update_keyword_research_project` / `delete_keyword_research_project`
- `search_keyword_research_projects` / `get_serp_overview`

### `brand_signals` — 2 operations
- `submit_brand_signal_score` / `retrieve_brand_signal_score`

### `holistic_audit` — 1 operation
- `get_holistic_seo_pillar_scores` — Technical, Content, Authority, UX pillar scores

---

## Content Genius (5 tool groups, ~51 operations)

### `content_generation` — 9 operations
The 4-step article workflow:
1. `create_content_instance` — create article stub
2. `start_information_retrieval` → `poll_information_retrieval` — research phase
3. `start_headings_outline` → `poll_headings_outline` — outline phase
4. `generate_complete_article` — write the full article

Plus:
- `update_article_headings` — modify outline before generation
- `auto_generate_article` — skip manual steps (less control)
- `topic_suggestions` — get AI-suggested topics

### `article_management` — 11 operations
- `list_recent_articles` / `get_article_details` / `edit_article_content` / `regenerate_article`
- `run_content_grader` — score article quality
- `update_article_status` / `manage_article_keywords`
- `insert_article_links` / `export_article_to_google_doc` / `reassign_article_brand_vault`
- `list_trash_articles`

### `content_retrieval` — 12 operations
- `search_articles` / `get_recent_articles` / `filter_articles_by_status` / `filter_articles_by_tags`
- `get_project_articles` / `get_assigned_articles` / `get_high_quality_articles`
- `get_published_articles` / `get_scheduled_articles` / `advanced_filter_articles`
- `count_articles` / `get_article_summary`

### `content_publication` — 17 operations
WordPress and CMS publishing:
- `get_wordpress_website_options` / `publish_wordpress_article` / `draft_wordpress_article`
- `schedule_wordpress_article` / `cancel_wordpress_article`
- `get_cms_connectors` / `get_cms_form_schema` / `get_cms_dynamic_field_schema`
- `publish_cms_article` / `draft_cms_article` / `schedule_cms_article` / `cancel_cms_article`
- `get_article_publication_status` / `list_published_articles` / `list_scheduled_articles`
- `get_article_details` / `get_current_datetime_approx`

### `topical_maps` — 2 operations
- `create_topical_map` / `search_topical_maps`

---

## Google Business Profile (12 tool groups, ~49 operations)

### `gbp_connection` — 2 operations
- `all_available_locations` / `manage_connections`

### `gbp_locations_crud` — 9 operations
- `list_locations` / `get_location` / `update_location` / `load_location`
- `update_open_hours` / `update_open_info` / `update_special_hours`
- `get_location_stats` / `set_location_lock`

### `gbp_locations_deployment` — 3 operations
- `deploy_location` / `bulk_deploy_locations` / `suggest_description`

### `gbp_locations_recommendations` — 2 operations
- `generate_location_recommendations` / `bulk_apply_location_recommendations`

### `gbp_locations_categories_crud` — 2+ operations
- `replace_primary_category` / `bulk_add_additional_categories`

### `gbp_locations_services_crud` — 1+ operations
- `bulk_upsert_standard_services`

### `gbp_locations_attributes_crud` — 2+ operations
- `list_attributes` / `bulk_upsert_attributes`

### `gbp_posts_crud` — 8 operations
- `list_posts` / `get_post` / `update_post` / `publish_post` / `unpublish_post`
- `approve_post` / `unapprove_post` / `delete_post`

### `gbp_posts_generation` — 3 operations
- `bulk_generate_posts` / `bulk_create_posts` / `ai_generate_post_image`

### `gbp_posts_automation` — 4 operations
- `get_automated_posting_settings` / `update_automated_posting_settings`
- `enable_automated_posting` / `disable_automated_posting`

### `gbp_posts_social` — 3 operations
- `list_facebook_pages` / `list_instagram_accounts` / `list_twitter_accounts`

### `gbp_reviews` — 10 operations
- `list_reviews` / `get_review` / `update_review_reply` / `publish_review_reply` / `unpublish_review_reply`
- `ai_generate_review_reply` / `get_review_reply_stats` / `get_review_star_rating_stats`
- `get_review_reply_automation_settings` / `update_review_reply_automation_settings`

### `gbp_utility` — 2 operations
- `bulk_import_locations_entity` / `generate_share_hash`

---

## Local SEO / Heatmaps (2 tool groups, ~14 operations)

### `local_seo_business` — 7 operations
- `list_local_seo_businesses` / `create_local_seo_business` / `get_local_seo_business`
- `update_local_seo_business` / `delete_local_seo_business`
- `extract_local_seo_business_details` / `bulk_create_local_seo_businesses_with_grids`

### `local_seo_grids` — 7 operations
- `setup_grids` / `update_grid` / `refresh_grid` / `get_heatmap_quota`
- `bulk_update_grids` / `bulk_refresh_grids` / `bulk_remove_grids`

---

## Press Releases (3 tool groups, ~12 operations)

### `press_release_content` — 6 operations
- `list` / `create` / `get` / `write_press_release` / `list_content_types` / `delete`

### `press_release_distribution` — 3 operations
- `get_press_release_distributions` / `get_press_release_categories` / `publish_press_release`

### `press_release_hyperdrive_credits` — 3 operations
- `get_hdc_balance` / `get_hdc_usage_history` / `purchase_hdc_credits`

---

## Cloud Stacks (2 tool groups, ~9 operations)

### `cloud_stack_content` — 6 operations
- `list` / `create` / `get_content` / `get_status` / `list_templates` / `delete`

### `cloud_stack_distribution` — 3 operations
- `build_cloud_stack` / `publish_cloud_stack` / `get_cloud_stack_providers`

---

## Digital PR (3 tool groups, ~17 operations)

### `digital_pr_campaign_service` — 8 operations
- `list_campaign` / `create_campaign` / `get_campaign` / `update_campaign` / `toggle_campaign`
- `get_settings` / `update_settings` / `list_projects`

### `digital_pr_inbox_service` — 5 operations
- `monitor_inbox` / `manage_sent_items` / `get_email_thread` / `reply_to_email` / `list_linked_emails`

### `digital_pr_template_service` — 4 operations
- `list` / `create` / `get` / `update`

---

## AI Visibility / LLM SEO (4 tool groups, ~19 operations)

### `visibility` — 7 operations
- `get_brand_overview` / `get_visibility_trend`
- `get_competitor_visibility_rank` / `get_competitor_visibility_trend` / `get_competitor_share_of_voice`
- `get_queries_overview` / `get_topics_overview`

### `sentiment` — 2 operations
- `get_sentiment_overview` / `get_sentiment_trend`

### `queries` — 3 operations
- `list_queries` / `add_query` / `remove_query`

### `prompt_simulator` — 7 operations
- `submit_prompts` / `check_ps_status` / `list_prompt_analyses`
- `get_prompt_analysis` / `get_ps_responses` / `get_ps_summary` / `get_ps_visibility`

---

## Website Studio (1 tool group, ~6 operations)

### `website_studio_tools` — 6 operations
- `list_projects` / `create_project` / `get_project` / `publish_project`
- `ensure_containers_running` / `bulk_send_message`

---

## PPC / Smart Ads (8 tool groups, ~47 operations)

### `ads_account_crud` — 5 operations
- `list` / `get` / `update` / `delete` / `get_customer_ads_accounts`

### `ads_account_mgmt` — 6 operations
- `connect_new_account` / `check_write_permissions` / `check_conversions`
- `get_ads_account_conversions` / `get_sync_status` / `sync_from_google`

### `business_crud` — 6 operations
- `list` / `get` / `create` / `update` / `delete` / `validate_business`

### `business_mgmt` — 8 operations
- `generate_form_suggestions` / `create_products` / `geo_search`
- `get_business_overview` / `get_business_metrics` / `get_business_recommendations`
- `export_business_data` / `duplicate_business`

### `campaign` — 4 operations
- `list_campaigns_with_metrics` / `list_campaign_performance`
- `send_to_google_ads_account` / `import_campaigns`

### `product_crud` — 8 operations
- `list` / `get` / `add_product` / `update` / `generate_product_details`
- `bulk_create_keyword_clusters` / `list_grouped_keywords` / `review_products`

### `product_mgmt` — 7 operations
- `bulk_approve_products` / `bulk_disapprove_products` / `bulk_delete_products` / `bulk_restore_products`
- `bulk_create_campaign_budget` / `bulk_update_remote_status` / `bulk_validate_landing_page_urls`

### `task` — 3 operations
- `get_otto_ppc_task_status` — check async task progress
- `get_current_datetime` — server time reference
- `wait` — pause between polls

---

## GSC (Google Search Console)

### `GSC_Performance_Tool` — 1+ operations
- `get_performance` — search performance data

---

## Summary

| Category | Tool Groups | Operations |
|----------|-------------|------------|
| OTTO SEO | 10 | ~45 |
| Site Explorer | 8 | ~40 |
| Content Genius | 5 | ~51 |
| GBP | 12 | ~49 |
| Local SEO | 2 | ~14 |
| Press Releases | 3 | ~12 |
| Cloud Stacks | 2 | ~9 |
| Digital PR | 3 | ~17 |
| AI Visibility | 4 | ~19 |
| Website Studio | 1 | ~6 |
| PPC (Smart Ads) | 8 | ~47 |
| GSC | 1 | ~1 |
| **Total** | **~59** | **~310** |
