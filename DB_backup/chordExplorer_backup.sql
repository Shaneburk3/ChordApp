--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-08-01 22:04:17

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 223 (class 1259 OID 16518)
-- Name: audios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.audios (
    audio_id integer NOT NULL,
    user_id integer,
    file_name text NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    chord text NOT NULL,
    file_path text NOT NULL
);


ALTER TABLE public.audios OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16517)
-- Name: audios_audio_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.audios_audio_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.audios_audio_id_seq OWNER TO postgres;

--
-- TOC entry 4825 (class 0 OID 0)
-- Dependencies: 222
-- Name: audios_audio_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.audios_audio_id_seq OWNED BY public.audios.audio_id;


--
-- TOC entry 221 (class 1259 OID 16497)
-- Name: logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.logs (
    log_id integer NOT NULL,
    user_id integer,
    event_type text NOT NULL,
    event_message text NOT NULL,
    endpoint text,
    created_at timestamp with time zone DEFAULT now(),
    user_ids integer[]
);


ALTER TABLE public.logs OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16496)
-- Name: logs_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.logs_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.logs_log_id_seq OWNER TO postgres;

--
-- TOC entry 4826 (class 0 OID 0)
-- Dependencies: 220
-- Name: logs_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.logs_log_id_seq OWNED BY public.logs.log_id;


--
-- TOC entry 219 (class 1259 OID 16445)
-- Name: user_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_details (
    info_id integer NOT NULL,
    user_bio text,
    user_city text,
    user_country text,
    user_dob date
);


ALTER TABLE public.user_details OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16433)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    password text NOT NULL,
    role text,
    status text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16432)
-- Name: users_user_ID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."users_user_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."users_user_ID_seq" OWNER TO postgres;

--
-- TOC entry 4827 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_user_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."users_user_ID_seq" OWNED BY public.users.user_id;


--
-- TOC entry 4658 (class 2604 OID 16521)
-- Name: audios audio_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audios ALTER COLUMN audio_id SET DEFAULT nextval('public.audios_audio_id_seq'::regclass);


--
-- TOC entry 4656 (class 2604 OID 16500)
-- Name: logs log_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logs ALTER COLUMN log_id SET DEFAULT nextval('public.logs_log_id_seq'::regclass);


--
-- TOC entry 4655 (class 2604 OID 16436)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public."users_user_ID_seq"'::regclass);


--
-- TOC entry 4819 (class 0 OID 16518)
-- Dependencies: 223
-- Data for Name: audios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.audios (audio_id, user_id, file_name, created_at, chord, file_path) FROM stdin;
46	248	audios/248/248_1752051642671.webm	2025-07-09 10:00:47.018722	C	https://chordexplorer.s3.eu-north-1.amazonaws.com/audios/248/248_1752051642671.webm
\.


--
-- TOC entry 4817 (class 0 OID 16497)
-- Dependencies: 221
-- Data for Name: logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.logs (log_id, user_id, event_type, event_message, endpoint, created_at, user_ids) FROM stdin;
302	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-23 03:38:38.6784+01	\N
303	\N	validation_failure	Registration: "DOB must be a date.": Value 12-03-1995	/api/users/register	2025-06-23 03:54:55.0007+01	\N
304	\N	validation_failure	Registration: "DOB must be a date.": Value 12-03-1995	/api/users/register	2025-06-23 03:57:15.534453+01	\N
305	\N	validation_failure	Registration: "DOB must be a date.": Value 12-03-1995	/api/users/register	2025-06-23 04:01:29.757422+01	\N
306	\N	validation_failure	Registration: "Password is not long enough": Value 11111,Registration: "Must contain atleast 1 special character.": Value 11111,Registration: "DOB must be a date.": Value 12-03-1995	/api/users/register	2025-06-23 04:01:49.389534+01	\N
307	\N	validation_failure	Registration: "Password is not long enough": Value 11111,Registration: "Must contain atleast 1 special character.": Value 11111,Registration: "DOB must be a date.": Value 12-03-1995	/api/users/register	2025-06-23 04:03:28.978483+01	\N
308	\N	validation_failure	Registration: "Must contain atleast 1 special character.": Value 1111111£,Registration: "Passwords do not match": Value 1111111$,Registration: "DOB must be a date.": Value 12-03-1995	/api/users/register	2025-06-23 04:04:27.337649+01	\N
309	\N	validation_failure	Registration: "DOB must be a date.": Value 12-03-1995	/api/users/register	2025-06-23 04:05:02.692173+01	\N
310	212	logout	Logged out.	/api/users/login	2025-06-23 04:05:17.292816+01	\N
311	212	logout	Logged out.	/api/users/login	2025-06-23 04:05:29.085637+01	\N
312	232	login_failure	Email: hello@hello.com, Incorrect Password: hello@hello.com	/api/users/login	2025-06-23 04:06:14.441232+01	\N
313	232	login_success	Email: hello@hello.com, logged in.	/api/users/login	2025-06-23 04:06:27.573504+01	\N
314	\N	validation_failure	Registration: "DOB must be a date.": Value 12-03-1995	/api/users/register	2025-06-23 04:25:33.035479+01	\N
315	232	logout	Logged out.	/api/users/login	2025-06-23 04:27:47.217753+01	\N
316	\N	validation_failure	Registration: "DOB must be a date.": Value 12-03-1995	/api/users/register	2025-06-23 04:31:43.843433+01	\N
317	\N	validation_failure	Registration: "DOB must be a date.": Value 12-03-1995	/api/users/register	2025-06-23 04:32:52.19801+01	\N
318	\N	validation_failure	Registration: "DOB must be a date.": Value 12-03-1995	/api/users/register	2025-06-23 04:40:50.180901+01	\N
319	\N	validation_failure	Registration: "Must contain atleast 1 special character.": Value 11111111	/api/users/register	2025-06-23 04:43:03.280533+01	\N
320	237	login_failure	Email: testUser@testUser.com, Incorrect Password: F38djdn3Jdu3	/api/users/login	2025-06-23 04:47:59.198798+01	\N
321	237	login_failure	Email: testUser@testUser.com, Incorrect Password: F38djdn3Jdu3	/api/users/login	2025-06-23 04:47:59.253095+01	\N
322	\N	validation_failure	Registration: "Must contain atleast 1 special character.": Value F38djdn3Jdu3,Registration: "Please agree to T&Cs": Value 	/api/users/register	2025-06-23 04:47:59.397119+01	\N
323	\N	validation_failure	Registration: "Must contain atleast 1 special character.": Value F38djdn3Jdu3,Registration: "Please agree to T&Cs": Value 	/api/users/register	2025-06-23 04:47:59.743799+01	\N
324	238	login_failure	Email: testUser@testUser.com, Incorrect Password: F38djdn3Jdu3	/api/users/login	2025-06-23 05:35:30.100308+01	\N
325	238	login_failure	Email: testUser@testUser.com, Incorrect Password: F38djdn3Jdu3	/api/users/login	2025-06-23 05:38:55.044977+01	\N
326	238	login_failure	Email: testUser@testUser.com, Incorrect Password: F38djdn3Jdu3	/api/users/login	2025-06-23 05:41:24.500924+01	\N
327	\N	validation_failure	Registration: "Must contain atleast 1 special character.": Value F38djdn3Jdu3,Registration: "Please agree to T&Cs": Value 	/api/users/register	2025-06-23 05:42:38.665409+01	\N
328	239	login_failure	Email: testUser@testUser.com, Incorrect Password: 1111111$	/api/users/login	2025-06-23 05:42:49.106741+01	\N
329	\N	validation_failure	Registration: "Must contain atleast 1 special character.": Value F38djdn3Jdu3,Registration: "Please agree to T&Cs": Value 	/api/users/register	2025-06-23 05:43:18.169859+01	\N
330	240	login_success	Email: testUser@testUser.com, logged in.	/api/users/login	2025-06-23 05:43:28.60627+01	\N
331	\N	validation_failure	Registration: "Must contain atleast 1 special character.": Value F38djdn3Jdu3,Registration: "Please agree to T&Cs": Value 	/api/users/register	2025-06-23 05:44:49.264549+01	\N
332	241	login_success	Email: testUser@testUser.com, logged in.	/api/users/login	2025-06-23 05:44:59.636372+01	\N
333	241	login_success	Email: testUser@testUser.com, logged in.	/api/users/login	2025-06-23 05:45:10.207523+01	\N
334	241	update_success	Updated 241 successfull.	/api/users/update	2025-06-23 05:45:11.109357+01	\N
335	\N	validation_failure	Registration: "Must contain atleast 1 special character.": Value F38djdn3Jdu3,Registration: "Please agree to T&Cs": Value 	/api/users/register	2025-06-23 05:45:21.462232+01	\N
336	\N	validation_failure	Registration: "Must contain atleast 1 special character.": Value F38djdn3Jdu3,Registration: "Please agree to T&Cs": Value 	/api/users/register	2025-06-23 05:48:17.340553+01	\N
337	242	login_success	Email: testUser@testUser.com, logged in.	/api/users/login	2025-06-23 05:48:27.698253+01	\N
338	242	login_success	Email: testUser@testUser.com, logged in.	/api/users/login	2025-06-23 05:48:38.273199+01	\N
339	242	update_success	Updated 242 successfull.	/api/users/update	2025-06-23 05:48:39.231337+01	\N
340	\N	validation_failure	Registration: "Must contain atleast 1 special character.": Value F38djdn3Jdu3,Registration: "Please agree to T&Cs": Value 	/api/users/register	2025-06-23 05:48:49.059165+01	\N
341	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 19:10:09.487414+01	\N
342	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 19:11:03.123611+01	\N
343	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 19:12:28.205289+01	\N
344	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 19:38:15.822354+01	\N
345	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 19:38:37.645357+01	\N
346	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 19:40:04.474912+01	\N
347	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 20:05:21.328267+01	\N
348	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 20:07:15.258692+01	\N
349	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 20:07:46.966985+01	\N
350	214	logout	Logged out.	/api/users/login	2025-06-23 21:03:42.426698+01	\N
351	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 21:03:49.739963+01	\N
352	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 21:13:09.636963+01	\N
353	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 21:27:48.463306+01	\N
354	214	logout	Logged out.	/api/users/login	2025-06-23 21:40:04.357432+01	\N
355	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 21:40:11.665645+01	\N
356	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 21:44:38.929344+01	\N
357	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 21:46:15.769074+01	\N
358	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 21:47:41.349457+01	\N
359	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 21:48:10.293059+01	\N
360	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 21:52:44.139174+01	\N
361	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 21:53:16.012842+01	\N
362	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 22:02:07.761245+01	\N
363	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 22:20:54.761064+01	\N
364	214	logout	Logged out.	/api/users/login	2025-06-23 22:23:45.728287+01	\N
365	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 22:23:54.048674+01	\N
366	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 22:30:14.522177+01	\N
367	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 22:34:34.953759+01	\N
368	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 23:22:49.819892+01	\N
369	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 23:27:13.604+01	\N
370	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 23:28:03.819929+01	\N
371	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 23:31:21.429886+01	\N
372	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 23:32:37.689485+01	\N
373	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 23:33:33.960491+01	\N
374	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 23:33:51.951153+01	\N
375	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-23 23:54:29.511913+01	\N
376	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-24 00:01:59.934403+01	\N
377	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-24 00:02:30.853056+01	\N
378	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-24 00:02:54.518825+01	\N
379	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-24 00:19:47.764496+01	\N
380	212	logout	Logged out.	/api/users/login	2025-06-24 00:19:52.511673+01	\N
381	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-24 00:20:01.102564+01	\N
382	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-24 00:20:27.192093+01	\N
383	212	login_failure	Email: shane18280@gmail.com, Incorrect Password: admin	/api/users/login	2025-06-24 00:21:52.942836+01	\N
384	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-24 00:21:58.290711+01	\N
385	212	logout	Logged out.	/api/users/login	2025-06-24 00:22:01.453632+01	\N
386	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-24 00:22:08.200797+01	\N
387	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-24 00:22:45.058178+01	\N
388	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-24 00:24:46.390615+01	\N
389	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-24 00:45:33.392171+01	\N
390	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-24 00:49:55.590614+01	\N
391	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-24 00:51:00.36252+01	\N
392	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-24 01:27:02.837263+01	\N
393	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-24 01:28:11.500869+01	\N
394	214	logout	Logged out.	/api/users/login	2025-06-24 01:35:22.812073+01	\N
395	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-24 01:35:31.501963+01	\N
396	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-24 01:43:59.008089+01	\N
397	214	logout	Logged out.	/api/users/login	2025-06-24 03:29:10.924021+01	\N
398	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-24 03:29:20.269977+01	\N
399	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-24 04:35:58.536335+01	\N
400	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-24 20:00:58.045384+01	\N
401	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-25 03:32:12.517902+01	\N
402	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-26 21:27:22.60564+01	\N
403	212	logout	Logged out.	/api/users/login	2025-06-26 22:21:36.414091+01	\N
404	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-27 03:49:20.65453+01	\N
405	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-27 05:22:11.070081+01	\N
406	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-27 22:33:24.00493+01	\N
407	212	logout	Logged out.	/api/users/login	2025-06-27 22:35:51.84002+01	\N
408	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-27 23:30:03.672948+01	\N
409	212	update_success	Updated 212 successfull.	/api/users/update	2025-06-27 23:30:38.409466+01	\N
410	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-28 02:21:53.14306+01	\N
411	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-28 05:18:11.203908+01	\N
412	212	logout	Logged out.	/api/users/login	2025-06-28 05:22:50.283293+01	\N
413	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-06-28 05:23:01.013787+01	\N
414	\N	admin_action	232,233,234 suspended.	/api/users/admin/selected_action	2025-06-28 05:23:16.523507+01	\N
415	\N	admin_action	232,233,234 unsuspended.	/api/users/admin/selected_action	2025-06-28 05:23:28.790995+01	\N
416	214	admin_action	admin@admin.com updated by admin.	/api/users/admin/update	2025-06-28 05:24:28.387151+01	\N
417	233	admin_action	james@gmail.com updated by admin.	/api/users/admin/update	2025-06-28 05:24:50.930579+01	\N
418	212	login_failure	Email: shane18280@gmail.com, Incorrect Password: 11111111111	/api/users/login	2025-06-28 19:38:00.253548+01	\N
419	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-28 19:38:08.742637+01	\N
420	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-28 19:53:39.420599+01	\N
421	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-28 19:53:39.511784+01	\N
422	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-28 21:43:10.930437+01	\N
423	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-28 22:43:44.759593+01	\N
424	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-28 23:44:45.978601+01	\N
425	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-28 23:44:46.099764+01	\N
426	212	logout	Logged out.	/api/users/login	2025-06-29 00:31:36.054098+01	\N
427	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-29 00:31:44.279659+01	\N
428	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-29 00:39:09.917614+01	\N
429	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-29 00:50:57.782908+01	\N
430	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-29 00:52:55.036697+01	\N
431	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-29 00:53:25.22355+01	\N
432	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-29 00:56:15.964673+01	\N
433	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-29 00:57:23.495246+01	\N
434	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-29 00:58:36.35646+01	\N
435	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-29 01:00:27.646725+01	\N
436	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-29 01:00:27.877861+01	\N
437	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-29 01:01:14.513671+01	\N
438	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-29 01:03:19.128234+01	\N
439	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-29 01:04:53.92127+01	\N
440	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-29 01:16:04.770665+01	\N
441	212	logout	Logged out.	/api/users/login	2025-06-29 01:17:13.596293+01	\N
442	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-29 01:17:20.51282+01	\N
443	212	logout	Logged out.	/api/users/login	2025-06-29 03:36:10.076801+01	\N
444	233	login_failure	Email: james@gmail.com, Incorrect Password: 11111111	/api/users/login	2025-06-29 03:36:23.706576+01	\N
445	233	login_failure	Email: james@gmail.com, Incorrect Password: 1111111#	/api/users/login	2025-06-29 03:36:47.387206+01	\N
446	\N	validation_failure	Registration: "Must contain atleast 1 special character.": Value 11111111	/api/users/register	2025-06-29 03:37:21.138713+01	\N
447	245	login_success	Email: email1@gmail.com, logged in.	/api/users/login	2025-06-29 03:37:42.125358+01	\N
448	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-29 05:10:09.20876+01	\N
449	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-29 05:10:19.21106+01	\N
450	212	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-06-29 05:11:08.922084+01	\N
566	214	logout	Logged out.	/api/users/logout	2025-07-04 00:12:05.531229+01	\N
567	248	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-07-04 00:12:12.3066+01	\N
568	\N	validation_failure	Registration: "Please agree to T&Cs": Value 	/api/users/register	2025-07-04 00:37:15.437936+01	\N
569	262	login_success	Email: testUser@testUser.com, logged in.	/api/users/login	2025-07-04 00:37:41.22205+01	\N
570	262	login_success	Email: testUser@testUser.com, logged in.	/api/users/login	2025-07-04 00:38:05.524075+01	\N
571	262	login_success	Email: testUser@testUser.com, logged in.	/api/users/login	2025-07-04 00:51:48.29318+01	\N
572	262	login_success	Email: testUser@testUser.com, logged in.	/api/users/login	2025-07-04 00:52:40.919915+01	\N
573	262	login_success	Email: testUser@testUser.com, logged in.	/api/users/login	2025-07-04 00:53:47.037572+01	\N
574	262	login_success	Email: testUser@testUser.com, logged in.	/api/users/login	2025-07-04 00:56:38.05195+01	\N
575	262	login_success	Email: testUser@testUser.com, logged in.	/api/users/login	2025-07-04 00:59:10.641696+01	\N
576	262	login_success	Email: testUser@testUser.com, logged in.	/api/users/login	2025-07-04 00:59:35.04237+01	\N
577	262	login_success	Email: testUser@testUser.com, logged in.	/api/users/login	2025-07-04 01:00:23.844171+01	\N
578	262	login_success	Email: testUser@testUser.com, logged in.	/api/users/login	2025-07-04 01:01:21.488597+01	\N
579	262	login_success	Email: testUser@testUser.com, logged in.	/api/users/login	2025-07-04 01:04:21.298335+01	\N
580	262	login_success	Email: testUser@testUser.com, logged in.	/api/users/login	2025-07-04 01:06:22.907761+01	\N
581	262	login_success	Email: testUser@testUser.com, logged in.	/api/users/login	2025-07-04 01:07:14.042312+01	\N
582	248	update_success	Updated 248 successfull.	/api/users/update	2025-07-04 01:08:02.7571+01	\N
583	248	update_success	Updated 248 successfull.	/api/users/update	2025-07-04 01:08:15.4893+01	\N
584	262	login_success	Email: testUser@testUser.com, logged in.	/api/users/login	2025-07-04 01:09:08.410075+01	\N
585	262	update_success	Updated 262 successfull.	/api/users/update	2025-07-04 01:09:09.165535+01	\N
586	\N	validation_failure	Registration: "Please agree to T&Cs": Value 	/api/users/register	2025-07-04 01:34:08.237655+01	\N
587	248	login_failure	Email: shane18280@gmail.com, Incorrect Password: 11111111	/api/users/login	2025-07-09 09:54:12.750053+01	\N
588	248	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-07-09 09:54:15.766725+01	\N
589	248	logout	Logged out.	/api/users/logout	2025-07-09 10:03:23.4063+01	\N
590	214	login_failure	Email: admin@admin.com, Incorrect Password: 1111111$	/api/users/login	2025-07-09 10:03:31.825292+01	\N
591	214	login_failure	Email: admin@admin.com, Incorrect Password: 1111111£	/api/users/login	2025-07-09 10:03:34.26241+01	\N
592	214	login_failure	Email: admin@admin.com, Incorrect Password: 11111111#	/api/users/login	2025-07-09 10:03:36.097511+01	\N
593	214	login_failure	Email: admin@admin.com, Incorrect Password: 11111111#	/api/users/login	2025-07-09 10:03:36.462596+01	\N
594	214	login_failure	Email: admin@admin.com, Incorrect Password: 111111111	/api/users/login	2025-07-09 10:03:37.6085+01	\N
595	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-07-09 10:03:40.835587+01	\N
596	232	admin_action	hello@hello.com updated by admin.	/api/users/admin/update	2025-07-09 10:06:01.250166+01	\N
597	\N	admin_action	232 unsuspended.	/api/users/admin/selected_action	2025-07-09 10:06:08.927241+01	\N
598	\N	admin_action	232,234,248 suspended.	/api/users/admin/selected_action	2025-07-09 10:06:22.91438+01	\N
599	\N	admin_action	232,234,248 unsuspended.	/api/users/admin/selected_action	2025-07-09 10:06:33.2353+01	\N
600	214	logout	Logged out.	/api/users/logout	2025-07-09 10:08:58.958683+01	\N
601	\N	validation_failure	Registration: "First Name: No special characters": Value shane£,Registration: "Last Name: No special characters": Value burk£,Registration: "Must be an email.": Value shane1828@m.m,Registration: "Password is not long enough": Value 111,Registration: "Must contain atleast 1 special character.": Value 111,Registration: "Passwords do not match": Value 1111,Registration: "Please agree to T&Cs": Value 	/api/users/register	2025-07-09 10:44:36.150122+01	\N
602	\N	validation_failure	Registration: "First Name: No special characters": Value test£,Registration: "Last Name: No special characters": Value test£,Registration: "Must be an email.": Value test@t.c,Registration: "Password is not long enough": Value 111,Registration: "Must contain atleast 1 special character.": Value 111,Registration: "Please agree to T&Cs": Value 	/api/users/register	2025-07-09 10:45:40.890302+01	\N
603	\N	validation_failure	Registration: "First Name: No special characters": Value test£,Registration: "Last Name: No special characters": Value test£,Registration: "Must be an email.": Value test@t.c,Registration: "Password is not long enough": Value 111,Registration: "Must contain atleast 1 special character.": Value 111,Registration: "Please agree to T&Cs": Value 	/api/users/register	2025-07-09 10:50:32.59055+01	\N
604	\N	validation_failure	Registration: "First Name: No special characters.": Value test£,Registration: "Last Name: No special characters.": Value test£,Registration: "Must be an email.": Value test@t.c,Registration: "Password is not long enough.": Value 111,Registration: "Must contain at least 1 special character.": Value 111,Registration: "Please agree to T&Cs.": Value off	/api/users/register	2025-07-09 10:56:38.062329+01	\N
605	\N	validation_failure	Registration: "First Name: No special characters.": Value test£,Registration: "Last Name: No special characters.": Value test£,Registration: "Must be an email.": Value test@t.c,Registration: "Password is not long enough.": Value 111,Registration: "Must contain at least 1 special character.": Value 111,Registration: "Please agree to T&Cs.": Value off	/api/users/register	2025-07-09 10:57:14.112168+01	\N
606	\N	validation_failure	Registration: "First Name: No special characters.": Value Test$,Registration: "Last Name: No special characters.": Value User$,Registration: "Must be an email.": Value test@t.c,Registration: "Password is not long enough.": Value 111,Registration: "Must contain at least 1 special character.": Value 111,Registration: "Please agree to T&Cs.": Value 	/api/users/register	2025-07-12 15:23:30.941772+01	\N
607	248	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-07-12 15:37:17.380399+01	\N
608	248	update_success	Updated 248 successfull.	/api/users/update	2025-07-12 15:37:41.524915+01	\N
609	\N	validation_failure	Registration: "Please agree to T&Cs.": Value 	/api/users/register	2025-07-12 16:04:21.446182+01	\N
610	270	login_success	Email: testUser@testUser.com, logged in.	/api/users/login	2025-07-12 16:04:31.653721+01	\N
611	270	login_success	Email: testUser@testUser.com, logged in.	/api/users/login	2025-07-12 16:04:42.700348+01	\N
612	270	update_success	Updated 270 successfull.	/api/users/update	2025-07-12 16:04:43.442178+01	\N
613	\N	validation_failure	Registration: "Please agree to T&Cs.": Value 	/api/users/register	2025-07-12 16:04:54.247088+01	\N
614	\N	validation_failure	Registration: "Please agree to T&Cs.": Value 	/api/users/register	2025-07-12 16:05:54.496015+01	\N
615	248	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-07-13 09:44:48.737753+01	\N
616	248	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-07-15 13:25:07.924877+01	\N
617	248	logout	Logged out.	/api/users/logout	2025-07-15 13:27:34.126906+01	\N
618	214	login_failure	Email: admin@admin.com, Incorrect Password: 1111111$	/api/users/login	2025-07-15 13:27:40.979228+01	\N
619	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-07-15 13:27:45.288652+01	\N
620	214	logout	Logged out.	/api/users/logout	2025-07-15 13:42:04.152952+01	\N
621	\N	validation_failure	Registration: "Password is not long enough.": Value asd,Registration: "Must contain at least 1 special character.": Value asd,Registration: "Please agree to T&Cs.": Value 	/api/users/register	2025-07-15 13:42:21.877232+01	\N
622	\N	validation_failure	Registration: "Password is not long enough.": Value 11212,Registration: "Must contain at least 1 special character.": Value 11212,Registration: "Passwords do not match.": Value 12441	/api/users/register	2025-07-15 13:49:07.07448+01	\N
623	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-07-15 13:49:17.824183+01	\N
624	214	logout	Logged out.	/api/users/logout	2025-07-15 13:49:49.949857+01	\N
625	\N	validation_failure	Registration: "Password is not long enough.": Value 1111,Registration: "Must contain at least 1 special character.": Value 1111,Registration: "Passwords do not match.": Value 11111	/api/users/register	2025-07-15 13:50:03.82948+01	\N
626	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-07-15 13:50:24.447066+01	\N
627	214	logout	Logged out.	/api/users/logout	2025-07-15 13:51:07.566767+01	\N
628	\N	validation_failure	Registration: "Passwords do not match.": Value aaaaasa$	/api/users/register	2025-07-15 13:51:26.316293+01	\N
629	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-07-15 13:51:40.980131+01	\N
630	214	logout	Logged out.	/api/users/logout	2025-07-15 13:53:12.525032+01	\N
631	248	login_failure	Email: shane18280@gmail.com, Incorrect Password: 123312231	/api/users/login	2025-07-15 13:53:19.497593+01	\N
632	\N	register_failure	Registration: "Must contain at least 1 special character.": Value 123asdasd£,Registration: "Passwords do not match.": Value asdasd1212e£	/api/users/register	2025-07-15 13:53:40.637838+01	\N
633	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-07-15 13:53:51.573309+01	\N
634	248	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-07-19 08:02:08.186063+01	\N
635	248	update_success	Updated 248 successfull.	/api/users/update	2025-07-19 08:02:25.0697+01	\N
636	248	logout	Logged out.	/api/users/logout	2025-07-19 08:02:40.164013+01	\N
637	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-07-19 08:02:48.50418+01	\N
638	\N	admin_action	267,268,269 suspended.	/api/users/admin/selected_action	2025-07-19 08:03:13.775868+01	\N
639	267	admin_action	shane182805@gmail.com updated by admin.	/api/users/admin/update	2025-07-19 08:03:25.720922+01	\N
640	\N	admin_action	267,268,269 deleted.	/api/users/admin/selected_action	2025-07-19 08:03:33.643349+01	\N
641	214	logout	Logged out.	/api/users/logout	2025-07-19 08:06:42.774053+01	\N
642	\N	register_failure	Registration: "Please agree to T&Cs.": Value 	/api/users/register	2025-07-19 12:27:46.308289+01	\N
643	\N	register_failure	Registration: "Please agree to T&Cs.": Value 	/api/users/register	2025-07-19 12:28:15.098703+01	\N
644	271	login_success	Email: testUser@testUser.com, logged in.	/api/users/login	2025-07-19 12:40:59.462886+01	\N
645	271	login_failure	Email: testUser@testUser.com, Incorrect Password: F38dydn3Jdy$	/api/users/login	2025-07-19 14:15:32.529827+01	\N
646	271	login_failure	Email: testUser@testUser.com, Incorrect Password: F38dydn3Jdy$	/api/users/login	2025-07-19 14:17:16.676701+01	\N
647	271	login_failure	Email: testUser@testUser.com, Incorrect Password: F38dydn3Jdy$	/api/users/login	2025-07-19 14:17:39.886944+01	\N
648	271	login_failure	Email: testUser@testUser.com, Incorrect Password: F38dydn3Jdy$	/api/users/login	2025-07-19 14:18:24.786899+01	\N
649	271	login_failure	Email: testUser@testUser.com, Incorrect Password: F38dydn3Jdy$	/api/users/login	2025-07-19 14:19:06.510548+01	\N
650	\N	register_failure	Registration: "First Name: No special characters.": Value Test$,Registration: "Last Name: No special characters.": Value User$,Registration: "Must be an email.": Value test@t.c,Registration: "Password is not long enough.": Value 111,Registration: "Must contain at least 1 special character.": Value 111,Registration: "Please agree to T&Cs.": Value 	/api/users/register	2025-07-19 14:25:53.590419+01	\N
651	\N	register_failure	Registration: "Must contain at least 1 special character.": Value F38djdn3Jdu	/api/users/register	2025-07-19 14:28:06.811833+01	\N
652	\N	register_failure	Registration: "Must contain at least 1 special character.": Value F38djdn3Jdu	/api/users/register	2025-07-19 14:28:44.929941+01	\N
653	\N	register_failure	Registration: "Password is not long enough.": Value F38dj,Registration: "Must contain at least 1 special character.": Value F38dj	/api/users/register	2025-07-19 14:38:59.448761+01	\N
654	\N	register_failure	Registration: "Password is not long enough.": Value F38dj,Registration: "Must contain at least 1 special character.": Value F38dj	/api/users/register	2025-07-19 14:39:49.733739+01	\N
655	\N	register_failure	Registration: "Password is not long enough.": Value F38dj,Registration: "Must contain at least 1 special character.": Value F38dj	/api/users/register	2025-07-19 14:40:10.246461+01	\N
656	\N	register_failure	Registration: "Password is not long enough.": Value F38dj$	/api/users/register	2025-07-19 14:47:37.913462+01	\N
657	\N	register_failure	Registration: "Must contain at least 1 special character.": Value F38djdn3Jdu	/api/users/register	2025-07-19 14:48:00.190518+01	\N
658	\N	register_failure	Registration: "Must be an email.": Value ' OR 1=1; --	/api/users/register	2025-07-19 14:54:17.694279+01	\N
659	\N	login_failure	Login: "Email is required.": Value ' OR 1=1; --,Login: "Password is required.": Value undefined	/api/users/login	2025-07-19 14:54:17.734591+01	\N
660	\N	register_failure	Registration: "First Name: No special characters.": Value &lt;script&gt;XXS ATTACK&lt;&#x2F;script&gt;	/api/users/register	2025-07-19 15:14:10.183668+01	\N
661	\N	register_failure	Registration: "First Name: No special characters.": Value &lt;script&gt;XXS ATTACK&lt;&#x2F;script&gt;	/api/users/register	2025-07-19 15:14:29.003492+01	\N
662	\N	register_failure	Registration: "Please agree to T&Cs.": Value 	/api/users/register	2025-07-19 15:22:14.407217+01	\N
663	272	login_success	Email: testUser@testUser.com, logged in.	/api/users/login	2025-07-19 15:22:23.412227+01	\N
664	272	login_success	Email: testUser@testUser.com, logged in.	/api/users/login	2025-07-19 15:22:34.550355+01	\N
665	272	update_success	Updated 272 successfull.	/api/users/update	2025-07-19 15:22:35.507642+01	\N
666	\N	register_failure	Registration: "Please agree to T&Cs.": Value 	/api/users/register	2025-07-19 15:22:46.842272+01	\N
667	\N	register_failure	Registration: "First Name: No special characters.": Value Test$,Registration: "Last Name: No special characters.": Value User$,Registration: "Must be an email.": Value test@t.c,Registration: "Password is not long enough.": Value 111,Registration: "Must contain at least 1 special character.": Value 111,Registration: "Please agree to T&Cs.": Value 	/api/users/register	2025-07-19 15:22:50.300326+01	\N
668	\N	register_failure	Registration: "Password is not long enough.": Value F38dj$	/api/users/register	2025-07-19 15:24:25.757476+01	\N
669	\N	register_failure	Registration: "Password is not long enough.": Value F38dj$	/api/users/register	2025-07-19 15:25:54.516245+01	\N
670	\N	register_failure	Registration: "Password is not long enough.": Value F38dj$	/api/users/register	2025-07-19 15:28:50.591814+01	\N
671	\N	register_failure	Registration: "Password is not long enough.": Value F38dj$	/api/users/register	2025-07-19 15:29:18.972779+01	\N
672	248	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-07-26 14:17:40.81428+01	\N
673	248	logout	Logged out.	/api/users/logout	2025-07-26 14:19:03.471767+01	\N
674	214	login_success	Email: admin@admin.com, logged in.	/api/users/login	2025-07-26 14:19:14.551947+01	\N
675	\N	admin_action	234 deleted.	/api/users/admin/selected_action	2025-07-26 14:19:23.441123+01	\N
676	232	admin_action	hello@hello.com updated by admin.	/api/users/admin/update	2025-07-26 14:19:41.66318+01	\N
677	214	logout	Logged out.	/api/users/logout	2025-07-26 14:21:09.135584+01	\N
678	248	login_success	Email: shane18280@gmail.com, logged in.	/api/users/login	2025-08-01 21:50:36.530443+01	\N
\.


--
-- TOC entry 4815 (class 0 OID 16445)
-- Dependencies: 219
-- Data for Name: user_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_details (info_id, user_bio, user_city, user_country, user_dob) FROM stdin;
263	Edit this page!	City	Country	1995-03-12
264	Edit this page!	City	Country	1995-03-12
265	Edit this page!	City	Country	1995-03-12
266	Edit this page!	City	Country	1995-03-12
248	This is my now bio	Dublin	Ireland	1994-03-12
232	Edit this page!	City	Country	1995-03-12
214	Edit this page!	City	Country	1995-03-12
\.


--
-- TOC entry 4814 (class 0 OID 16433)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, first_name, last_name, email, created_at, password, role, status) FROM stdin;
232	shane	burk	hello@hello.com	2025-06-23 00:00:00	$2b$10$O885/Y/Nx3sRGTdSGEaG6OW2Msx.MTuQ7oXfHJv3IFiV94qfrpjG6	BASIC	SUSPENDED
248	shane	burk	shane18280@gmail.com	2025-06-30 00:00:00	$2b$10$KPXXbrT2gLF.zCnSNTbt2O2X2sY5VKwxRWhcBxlmo8Dr0sdYe67Z6	BASIC	ACTIVE
263	shane	burk	testSuspended@test.com	2025-07-09 00:00:00	$2b$10$RyYrjV6ninC1fQphCeurWev5KjqHyI5PE7oEKWuDKGUtO2dbyAsVi	BASIC	ACTIVE
264	shane	burk	testSuspended1@test.com	2025-07-09 00:00:00	$2b$10$xlJgdFiJhnvPvQNdblwPfeKx3GQQSckzHibYju/o76wWgACcGmeZ.	BASIC	ACTIVE
265	shane	burk	testSuspended2@test.com	2025-07-09 00:00:00	$2b$10$VPpl9kD7xRSyREgPkatxX.HhPvF1Ceh0XuQIrVABVoUSb5WedTb42	BASIC	ACTIVE
266	shane	burk	testSuspended3@test.com	2025-07-09 00:00:00	$2b$10$6cxljLHnwopDUf2CpFjB7.82jFavz/XMHCgrvcGz3COqlkZhh8RdS	BASIC	ACTIVE
214	Admin	User	admin@admin.com	2025-06-03 00:00:00	$2b$10$Dhqt.b8mwOcX/sC9eVuKHuDx/tKTix6U496z6qcpq2y7nL6PySFbW	ADMIN	ACTIVE
\.


--
-- TOC entry 4828 (class 0 OID 0)
-- Dependencies: 222
-- Name: audios_audio_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.audios_audio_id_seq', 46, true);


--
-- TOC entry 4829 (class 0 OID 0)
-- Dependencies: 220
-- Name: logs_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.logs_log_id_seq', 678, true);


--
-- TOC entry 4830 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_user_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."users_user_ID_seq"', 272, true);


--
-- TOC entry 4665 (class 2606 OID 16526)
-- Name: audios audios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audios
    ADD CONSTRAINT audios_pkey PRIMARY KEY (audio_id);


--
-- TOC entry 4663 (class 2606 OID 16505)
-- Name: logs logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logs
    ADD CONSTRAINT logs_pkey PRIMARY KEY (log_id);


--
-- TOC entry 4661 (class 2606 OID 16440)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4667 (class 2606 OID 16527)
-- Name: audios audios_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audios
    ADD CONSTRAINT audios_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- TOC entry 4666 (class 2606 OID 16453)
-- Name: user_details fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_details
    ADD CONSTRAINT fk_user_id FOREIGN KEY (info_id) REFERENCES public.users(user_id);


-- Completed on 2025-08-01 22:04:17

--
-- PostgreSQL database dump complete
--

