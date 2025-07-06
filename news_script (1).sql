-- ----------------------------
--  Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS public.news;

CREATE TABLE public.news (
  id bigserial PRIMARY KEY,
  title text,
  content text,
  image_url text,
  created_at timestamptz DEFAULT now(),
  user_id uuid
);

-- ----------------------------
--  Data for table news
-- ----------------------------
INSERT INTO news (id, title, content, image_url, created_at, user_id) VALUES (1, 'Tsadfas', 'asdfasdf', 'https://zqzrvbkntwahqgbgxkcq.supabase.co/storage/v1/object/public/news-images/1751649506529_b722b946fdcb27c83a245ebdb3739fee.jpg', '2025-07-04 17:18:26.331302+00', '2a122982-6160-42e1-b646-65f3cfa7c19f');
INSERT INTO news (id, title, content, image_url, created_at, user_id) VALUES (2, 'asdfdf', 'asdfdfdf', 'https://zqzrvbkntwahqgbgxkcq.supabase.co/storage/v1/object/public/news-images/1751649752101_Screenshot%202023-04-20%20034433.png', '2025-07-04 17:22:32.210747+00', '2a122982-6160-42e1-b646-65f3cfa7c19f');
INSERT INTO news (id, title, content, image_url, created_at, user_id) VALUES (3, 'asdfasdfasf', 'asdfasdfasfd', 'https://zqzrvbkntwahqgbgxkcq.supabase.co/storage/v1/object/public/news-images/1751788121562_Screenshot%202023-03-06%20175414.png', '2025-07-06 07:48:42.004171+00', '2a122982-6160-42e1-b646-65f3cfa7c19f');
INSERT INTO news (id, title, content, image_url, created_at, user_id) VALUES (4, 'roblox', 'ฟหกด', 'https://zqzrvbkntwahqgbgxkcq.supabase.co/storage/v1/object/public/news-images/1751788135177_Screenshot%202023-03-11%20032242.png', '2025-07-06 07:48:55.360553+00', '2a122982-6160-42e1-b646-65f3cfa7c19f');
INSERT INTO news (id, title, content, image_url, created_at, user_id) VALUES (21, 'ไปให้ไกลกว่าเกม ! Nintendo ยืนยันว่ามีโปรเจกต์อื่น ๆ นอกเหนือจากหนัง Mario และ Zelda', 'The Super Mario Bros. Movie คือหนังจากเกมค่าย Nintendo ที่ประสบความสำเร็จสุด ๆ ในระดับปรากฏการณ์ และคิวถัดไปที่กำลังจะเข้าฉาย คือหนังจาก The Legend of Zelda ทว่าล่าสุดก็ดูเหมือน Nintendo จะยังมีโปรเจกต์อื่น ๆ อยู่เช่นกัน นอกเหนือจาก 2 IP นี้


โดยในช่วงถาม-ตอบ ของการประชุมกับเหล่านักลงทุน มีคำถามที่น่าสนใจ ว่าทาง Nintendo มีแผนจะทำคอนเทนต์ภาพยนตร์อะไรเพิ่มเติม นอกเหนือจาก Mario และ The Legend of Zelda หรือไม่ ซึ่งคุณ Shuntaro Furukawa, ประธานคนปัจจุบันของ Nintendo ตอบไว้อย่างน่าสนใจว่า

“เราปล่อย The Super Mario Bros. Movie ออกฉายในโรงภาพยนตร์ไปแล้วเมื่อเดือนเมษายน 2023, และรู้สึกยินดีที่ได้เสียงตอบรับเชิงบวกจากผู้ชมทั่วโลก ซึ่งถ้ามองต่อไป เราก็มีแผนจะปล่อยภาพยนตร์แอนิเมชันเรื่องใหม่จากโลกของ Super Mario Bros. มาอีกในเดือนเมษายน 2026, รวมถึงภาพยนตร์คนแสดงจาก The Legend of Zelda ในเดือนพฤษภาคม 2027”

“ภายใต้กลยุทธ์ของเรา ซึ่งคือการ ‘ขยายจำนวนคนที่เข้าถึง IP ของ Nintendo ให้มากขึ้น’ เพื่อกระตุ้นธุรกิจฮาร์ดแวร์-ซอฟต์แวร์อันเป็นส่วนหลักของเรา, เราได้เริ่มทำหลาย ๆ อย่างนอกเหนือจากวิดีโอเกมมาหลายปีแล้ว สื่อภาพยนตร์เองก็เป็นหนึ่งในนั้นครับ และแทนที่เราจะแค่ให้สิทธิ์ IP ไปให้บริษัทอื่นทำหนัง เราก็ยังใช้แนวทางเชิงรุก ที่ Nintendo เข้ามามีส่วนร่วมในการผลิตเองเลย และลงทุนตามความจำเป็น วิธีนี้ช่วยให้เรารักษาคุณภาพผลงานได้อย่างมั่นคง”

“แม้ตอนนี้จะยังพูดถึงแผนงานอื่น ๆ นอกเหนือจากภาพยนตร์ The Legend of Zelda ไม่ได้, แต่เราก็กำลังทำโปรเจกต์อื่น ๆ อยู่อีกหลายโปรเจกต์ด้วยครับ”

ดังนั้นก็น่าลุ้นทีเดียว ว่า ‘โปรเจกต์อื่น ๆ’ ที่ Nintendo ยังคงอุบไว้ จะเป็นผลงานที่ดัดแปลงมาจาก IP ใดอีกของบริษัท ซึ่งถ้ามีความชัดเจน หรือมีเบาะแส/ข่าวลือที่น่าสนใจเพิ่มเติม เราก็จะมารายงานให้ทราบกันอีกครั้งในภายหลัง', 'https://zqzrvbkntwahqgbgxkcq.supabase.co/storage/v1/object/public/news-images/1751794181949.webp', '2025-07-06 09:29:42.17241+00', '248f1eb7-03eb-48a7-ba65-55744ec194db');
-- ----------------------------
--  Row‑Level Security policies
-- ----------------------------
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- ทุกคนอ่านข่าวได้
CREATE POLICY "Public read news"
ON public.news
FOR SELECT
USING (true);

-- ผู้ใช้ที่ login เท่านั้นโพสต์ข่าวได้
CREATE POLICY "Authenticated insert news"
ON public.news
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- เจ้าของข่าวเท่านั้นที่แก้ไข/ลบได้
CREATE POLICY "Owner can modify"
ON public.news
FOR UPDATE, DELETE
USING (user_id = auth.uid());
