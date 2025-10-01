-- Insert your <PROJECT-REF> and <TEALBASE_ANON_KEY> below, then uncomment the trigger creation and run `tealbase db push`
-- Alternatively, head to the Database Webhook settings https://tealbase.com/dashboard/project/_/database/hooks
-- Select "Create a new Hook" > Table "public.embeddings" > check "INSERT" & "Update" > Tealbase Edge Functions > Add auth header with service key

-- CREATE TRIGGER "on_inserted_or_updated_embedding"
-- AFTER INSERT
-- OR
-- UPDATE OF content ON public.embeddings FOR EACH ROW
-- EXECUTE FUNCTION tealbase_functions.http_request (
--   'https://<PROJECT-REF>.tealbase.co/functions/v1/generate-embedding',
--   'POST',
--   '{"Content-type":"application/json","Authorization":"Bearer <TEALBASE_ANON_KEY>"}',
--   '{}',
--   '5000'
-- );

-- ------------------------
-- FOR LOCAL TESTING ONLY. REMOVE OR COMMENT OUT WHEN PUSHING TO HOSTED PROJECT!

-- CREATE TRIGGER "on_inserted_or_updated_embedding"
-- AFTER INSERT
-- OR
-- UPDATE OF content ON public.embeddings FOR EACH ROW
-- EXECUTE FUNCTION tealbase_functions.http_request (
--   'http://kong:8000/functions/v1/generate-embedding',
--   'POST',
--   '{"Content-type":"application/json","Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"}',
--   '{}',
--   '5000'
-- );
