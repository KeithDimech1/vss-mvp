#!/usr/bin/env python3
"""
Parallel HTML Translation Script - English to Arabic (RESTARTED)
Fixed paths to correct HTML source directory
"""

import os
import sys
import time
from pathlib import Path
from multiprocessing import Pool, Manager
from bs4 import BeautifulSoup, NavigableString, Tag
from deep_translator import GoogleTranslator

# Directories - CORRECTED PATHS
HTML_DIR = Path("../05 Final (1) copy/html")
ARABIC_DIR = Path("Arabic")

# Translation settings
BATCH_SIZE = 4500
DELAY = 0.3
NUM_WORKERS = 4  # Process 4 files in parallel

# Arabic Executive Summary for GDAC file
ARABIC_EXECUTIVE_SUMMARY = """الملخص التنفيذي
تتشرف شركةPty Ltd   Lithodatبتقديم ردّها الخاص بمرحلة التأهيل المسبق لمنصة تحليلات الذكاء الاصطناعي والبيانات الضخمة لمركز تحليل البيانات الجيولوجية (GDAC-SA). ونُدرك أن هيئة المساحة الجيولوجية السعودية قد حصلت على الموافقة لإنشاء منصة متطورة تمكّن من تحقيق مستهدفات رؤية السعودية 2030 الهادفة إلى تطوير قطاع التعدين ليكون الركيزة الاقتصادية الثالثة للمملكة العربية السعودية. ويتعين على هذه المنصة دمج أنواع متعددة من البيانات الجيولوجية—بما في ذلك التقارير، والجيوكيمياء، والجيوفيزياء، والاستشعار عن بُعد، والجيولوجيا، وسجلات الحفر—الواردة من قاعدة البيانات الجيولوجية الوطنية (NGD)، ومركز المعلومات الوطني  (NIC)، وحملات العمل الحقلي الجديدة، ثم تطبيق تحليلات متقدمة بأستخدام الذكاء الاصطناعي لتقديم قدرات التنبؤ بالأحتمالات المعدنية، وتوليد الأهداف الاستكشافية. وتُقرّ هيئة المساحة الجيولوجية السعودية، وبصورة واضحة بأن جزءًا كبيرًا من هذه البيانات متوفر بجودة متفاوتة، وببيانات وصفية غير مكتملة، وبصيغ غير متسقة، وبتركيبات تراكمت على مدى عقود من العمل الجيولوجي.
 نحن في موقع فريد يمكّننا من تحقيق هذه الرؤية، لأننا قمنا بالفعل ببناء ما يتأمله GDAC-SA فعلى مدى العقد الماضي، نجحت  Lithodat  في تنفيذ ثلاث منصات وطنية متكاملة لبيانات الجيولوجيا لصالح هيئات المسح الجيولوجي الفيدرالية في أستراليا وكندا: EarthBank (منصة الجيوكيمياء الوطنية لهيئة الجيولوجيا الأسترالية)، وIsotopes.au (منصة النظائر المستقرة الفيدرالية التي طُوّرت بالتعاون مع منظمة CSIRO  وأربع جهات حكومية أسترالية أخرى)، وقاعدة بيانات CATCH (قاعدة بيانات الثرموكرونولوجيا (التأريخ الحراري) الكندية لصالح وزارة الموارد الطبيعية الكندية). وتتكون هذه المنصات مع النوع نفسه من البيانات الجيولوجية غير المتجانسة، ومتعددة الجهات، والمتراكمة عبر عقود، التي يتعيّن على GDAC-SA  مواءمتها، كما أنها تدعم تحليلات ممكّنة بالذكاء الاصطناعي لأغراض الاستكشاف المعدني، والتقييم البيئي، والبحث الجيولوجي. ويبرهن سجلنا الحافل ليس فقط على القدرة النظرية، بل على التنفيذ التشغيلي المثبت للبنية التحتية ذاتها التي تحتاجها GDAC-SA.
يؤكد طلب عرض السعر الصادر عن هيئة المساحة الجيولوجية السعودية على تطور رباعي المراحل:
المرحلة الأولى تتمثل في إنشاء منظومة بيانات تجريبية مثبتة مع نموذج تجريبي لقابلية الاستكشاف المعدني خلال 12 شهرًا؛

المرحلة الثانية تتضمن التوسع في أدوات استكشاف متقدمة قائمة على الذكاء الاصطناعي ونماذج تصنيفية تحاكي أنظمة التمعدن؛

المرحلة الثالثة تُعنى بتوسيع تكامل البيانات ليشمل موضوعات أوسع في علوم الأرض؛

والمرحلة الرابعة تركز على تطوير تحليل تراكمي لتقييم الأثر البيئي والاجتماعي.
ويحاكي هذا النهج المرحلي تنفيذاتنا السابقة الناجحة مع هيئات المسح الجيولوجي الحكومية. فقد بدأ EarthBank  بتكامل بيانات الجيوكيمياء الأساسية، ثم توسّع ليشمل النظائر، والتأريخ الجيولوجي، والثرموكرونولوجيا (التأريخ الحراري). وانطلق Isotopes.au  بتطبيقات زراعية ويتوسع حاليًا ليشمل الثروة السمكية والاستزراع المائي. وبدأت قاعدة بيانات CATCH  بشمال كندا ثم امتدت إلى جنوبها مع قدرات نمذجة التاريخ الحراري. نحن قادرون على تنفيذ و تسليم أسس المرحلة الأولى والتي ستُمكّن التطور طويل الأمد للمنصة، لأننا نفّذنا مسار التطوير ذاته عدة مرات وبنجاح باهر.
الأساس الحاسم: البيانات المنظمة أولًا لنجاح الذكاء الاصطناعي
يُحدّد طلب عرض السعر بدقة التحدي الجوهري لـ   GDAC-SA:  إنشاء منصة تحليل جغرافي موحّدة من مصادر بيانات تتسم بـ«تراكمات للبيانات ذات الفجوات، تشمل بيانات مهيكلة وغير مهيكلة، وبعضها يفتقر إلى البيانات الوصفية». وتُقرّ هيئة المساحة الجيولوجية السعودية بأن المرحلة الأولى يجب أن تنشئ «منظومة البيانات الأساسية» عبر تصميم هياكل البيانات، وهندسة السمات، ومعالجة اللغة الطبيعية، وتطوير خوارزميات جديدة. وهذا الفهم صحيح تمامًا. ونؤكد هنا مبدأً حاسمًا يحدد نجاح أو فشلGDAC-SA:  المسار الوحيد نحو سير عمل استكشاف معدني ممكّن بالذكاء الاصطناعي يمر عبر بيانات نظيفة (منظمة) ، موحّدة، ومتوافقة مع مبادئ FAIR.  فلا يمكن لنماذج تعلم الآلة تجاوز رداءة جودة البيانات. ولا تستطيع أي خوارزميات ذكاء اصطناعي متقدمة استخراج تنبؤات موثوقة للأستكشاف المعدني من مصطلحات غير متسقة، أو إحداثيات مكانية مفقودة، أو وحدات قياس غير متوافقة، أو مفردات غير مضبوطة. ومحاولات «إضافة» الذكاء الاصطناعي إلى بيانات سيئة الهيكلة تفشل حتمًا، لأن البيانات الرديئة تنتج تنبؤات رديئة.
منهجية «البيانات النظيفة أولًا» المعروفة بها Lithodat تضمن أن تُنشئ كل خطوة من خطوات إدخال البيانات وتحويلها وتخزينها مجموعات بيانات جاهزة للذكاء الاصطناعي منذ اليوم الأول. وقد دعمت منصاتنا الوطنية الثلاث هذه المنهجية بنجاح، وستلبي هذه البنية المعمارية نفسها متطلبات GDAC-SA:

الشكل (1): منهج «البيانات النظيفة أولًا» لدى  Lithodat
المرحلة الأولى (إدخال البيانات) تستخدم تناسقات متعددة الصيغ للتعامل مع تقارير PDF، وملفات CSV، وقواعد البيانات القديمة، والبيانات غير المهيكلة، مع تحقق آلي لمفردات علوم الأرض وتقييم الجودة عند نقطة الإدخال. وفي قاعدة بيانات CATCH، قمنا برقمنة أكثر من 50 عامًا من البيانات القديمة (1970–2021) من 91 مصدرًا متباينًا، شملت تقارير ورقية تماثلية، وملفات PDF غير موجهة، وأشكالًا منشورة، مع إسناد المواقع جغرافيًا من خرائط دون إحداثيات GPS— وهو التحدي التاريخي ذاته الذي يواجهه  GDAC-SA مع أرشيفي   NGD و.NIC
المرحلة الثانية (التوحيد الدلالي) تُنشئ مفردات مضبوطة قائمة على معيار SKOS (أنطولوجيات) لربط المصطلحات المتنوعة بمفاهيم موحّدة، ما يمكّن هندسة السمات للذكاء الاصطناعي عبر مصادر غير متجانسة. وفي EarthBank، طورنا أكثر من 250 تعيينًا حقليًا موحّدًا جرى التحقق منها عبر ستة مصادر بيانات مؤسسية من ثلاث جهات اتحادية—وهو ما يماثل مباشرة تحدي  GDAC في مواءمة بيانات هيئة المساحة الجيولوجية السعودية عبر إدارات ذات أعراف مختلفة. وعلى سبيل المثال، تربط أنطولوجيا المعادن في  EarthBank بين «فلسبار البوتاسيوم»، و«K-feldspar»، و«الأورثوكلاز»، و«الميكروكلين» ضمن مفاهيم موحّدة، بما يسمح لنماذج تعلم الآلة بالتعرّف على العلاقات المعدنية عبر مجموعات بيانات تمتد لعقود وتضم جهات متعددة. وتُعد هذه القابلية للتشغيل البيني الدلالي أساسية لمنظومة بيانات المرحلة الأولى ولنمذجة أنظمة التمعدن القائمة على الذكاء الاصطناعي في المرحلة الثانية.
المرحلة الثالثة) تخزين قواعد بيانات متوافقة  مع (FAIR)) أستخدام  PostgreSQL مع PostGIS  للبيانات المكانية، وتسجيل شامل للبيانات الوصفية، ومسار تدقيق كامل وتتبع للمصدر، وواجهات برمجة تطبيقات RESTful  للوصول البرمجي من قِبل سير عمل الذكاء الاصطناعي. وقد حصل EarthBank  على شهادة CoreTrustSeal —وهو المعيار الدولي للمستودعات الرقمية الموثوقة—ما يبرهن تطبيقنا لمبادئ FAIR  (قابلة للاكتشاف، وقابلة للوصول، وقابلة للتشغيل البيني، وقابلة لإعادة الاستخدام). وبيانات FAIR  ليست مجرد متطلب امتثال، بل هي الأساس التقني لنجاح الذكاء الاصطناعي. فالقابلية للاكتشاف عبر بيانات وصفية غنية تتيح للخوارزميات اكتشاف السمات ذات الصلة تلقائيًا (الارتباطات المعدنية، والتحكمات البنيوية، والتواقيع الجيوكيميائية). وإتاحة الوصول عبر واجهات RESTful  تمكّن أطر تعلم الآلة  الخارجيةPyTorch, TensorFlow)  scikit-learn,) من الوصول البرمجي إلى مجموعات التدريب. وتحقق القابلية للتشغيل البيني عبر مفردات مضبوطة التوحيد الدلالي الضروري لهندسة السمات. أما قابلية إعادة الاستخدام مع تتبع مصدر شامل فتتيح إعادة تدريب نماذج المرحلة الثانية مع وصول بيانات جديدة في المرحلتين الثالثة والرابعة دون تدهور في الجودة.
المرحلة الرابعة) تطوير بوابة SGS التفاعلية (تُنشئ أنظمة وصول مزدوجة: بوابات بيانات عامة لإتاحة علوم الأرض المفتوحة والمتاحة للباحثين والصناعة، ومناطق خاصة وآمنة لسير العمل الداخلي لهيئة المساحة الجيولوجية السعودية مع تحكم بالوصول قائم على الأدوار وإدارة المستخدمين. وتعمل منصتا EarthBank  و Isotopes.au بكفاءة كمنصات عامة تخدم الجيولوجيين عالميًا، مع الحفاظ على خصائص إدارية آمنة لتلبية متطلبات التحليل الحكومي.
المرحلة الخامسة (طبقة تطبيقات الذكاء الاصطناعي/تعلم الآلة) تقدّم تحليلات متقدمة عبر هندسة السمات من بيانات نظيفة ومهيكلة، وتدريب نماذج تعلم الآلة للتصنيف والانحدار والتجميع، وإنتاج خرائط قابلية التمعدن وتوليد الأهداف، وتحليل السلاسل الزمنية لاكتشاف الاتجاهات."""


def translate_text(text, translator):
    """Translate text to Arabic"""
    if not text or not text.strip():
        return text
    if any('\u0600' <= c <= '\u06FF' for c in text):
        return text

    try:
        time.sleep(DELAY)
        if len(text) > BATCH_SIZE:
            chunks = []
            words = text.split()
            current = []
            current_len = 0
            for word in words:
                if current_len + len(word) + 1 > BATCH_SIZE:
                    chunks.append(' '.join(current))
                    current = [word]
                    current_len = len(word)
                else:
                    current.append(word)
                    current_len += len(word) + 1
            if current:
                chunks.append(' '.join(current))
            return ' '.join(translator.translate(chunk) for chunk in chunks)
        else:
            return translator.translate(text)
    except Exception as e:
        return text


def translate_element(element, translator, counter):
    """Recursively translate HTML elements"""
    if isinstance(element, NavigableString):
        text = str(element).strip()
        if text and len(text) > 1:
            translated = translate_text(text, translator)
            element.replace_with(translated)
            counter['count'] += 1
            if counter['count'] % 100 == 0:
                counter['checkpoint'] = counter['count']
    elif isinstance(element, Tag):
        if element.name in ['img', 'input']:
            for attr in ['alt', 'title', 'placeholder']:
                if element.get(attr):
                    element[attr] = translate_text(element[attr], translator)
        for child in list(element.children):
            translate_element(child, translator, counter)


def replace_exec_summary(soup):
    """Replace Executive Summary for GDAC file"""
    for tag in ['h1', 'h2', 'h3']:
        for heading in soup.find_all(tag):
            if "Executive Summary" in heading.get_text():
                heading.string = "الملخص التنفيذي"
                current = heading.next_sibling
                to_remove = []
                while current:
                    if isinstance(current, Tag) and current.name in ['h1', 'h2', 'h3']:
                        break
                    if isinstance(current, Tag):
                        to_remove.append(current)
                    current = current.next_sibling
                for elem in to_remove:
                    elem.decompose()
                for para in ARABIC_EXECUTIVE_SUMMARY.split('\n'):
                    if para.strip():
                        new_p = soup.new_tag('p')
                        new_p.string = para.strip()
                        heading.insert_after(new_p)
                return True
    return False


def translate_file_worker(args):
    """Worker function for parallel translation"""
    input_path, output_path, file_num, total_files = args
    translator = GoogleTranslator(source='en', target='ar')
    file_size_mb = input_path.stat().st_size / (1024 * 1024)

    result = {
        'file': input_path.name,
        'success': False,
        'size_mb': file_size_mb,
        'translations': 0,
        'error': None
    }

    try:
        print(f"\n[Worker {file_num}/{total_files}] START: {input_path.name} ({file_size_mb:.2f} MB)", flush=True)

        with open(input_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        soup = BeautifulSoup(content, 'lxml')

        if soup.html:
            soup.html['lang'] = 'ar'
            soup.html['dir'] = 'rtl'

        if input_path.name == "GDAC-SA-Response-Final-Clean.html":
            print(f"[Worker {file_num}] Replacing Executive Summary...", flush=True)
            replace_exec_summary(soup)

        counter = {'count': 0, 'checkpoint': 0}
        if soup.body:
            translate_element(soup.body, translator, counter)

        if soup.title and soup.title.string:
            soup.title.string = translate_text(str(soup.title.string), translator)
            counter['count'] += 1

        result['translations'] = counter['count']

        style = soup.new_tag('style')
        style.string = "body { direction: rtl; text-align: right; }"
        if soup.head:
            soup.head.append(style)

        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(str(soup))

        result['success'] = True
        print(f"[Worker {file_num}] ✓ COMPLETE: {input_path.name} ({counter['count']} translations)", flush=True)

    except Exception as e:
        result['error'] = str(e)
        print(f"[Worker {file_num}] ✗ ERROR: {input_path.name} - {e}", flush=True)

    return result


def main():
    """Main parallel workflow"""
    print("\n" + "="*80)
    print("PARALLEL HTML TO ARABIC TRANSLATION - RESTARTED")
    print(f"Workers: {NUM_WORKERS} parallel processes")
    print(f"Source: {HTML_DIR.absolute()}")
    print(f"Output: {ARABIC_DIR.absolute()}")
    print("="*80, flush=True)

    ARABIC_DIR.mkdir(exist_ok=True)

    html_files = sorted([f for f in HTML_DIR.glob("*.html")],
                       key=lambda x: x.stat().st_size)

    total_size_mb = sum(f.stat().st_size for f in html_files) / (1024 * 1024)

    print(f"\nFound {len(html_files)} files (Total: {total_size_mb:.1f} MB)")
    print("\nFile list:")
    for i, f in enumerate(html_files, 1):
        size_mb = f.stat().st_size / (1024 * 1024)
        print(f"  {i}. {f.name:<50} {size_mb:>8.2f} MB")

    print(f"\nStarting {NUM_WORKERS} parallel workers...\n", flush=True)

    work_items = [
        (html_file, ARABIC_DIR / html_file.name, i, len(html_files))
        for i, html_file in enumerate(html_files, 1)
    ]

    start_time = time.time()

    with Pool(processes=NUM_WORKERS) as pool:
        results = pool.map(translate_file_worker, work_items)

    elapsed = time.time() - start_time

    successful = sum(1 for r in results if r['success'])
    total_translations = sum(r['translations'] for r in results)

    print("\n" + "="*80)
    print("TRANSLATION COMPLETE")
    print("="*80)
    print(f"Success: {successful}/{len(html_files)} files")
    print(f"Total translations: {total_translations:,}")
    print(f"Time elapsed: {elapsed/60:.1f} minutes")
    print(f"Average speed: {total_size_mb/(elapsed/60):.1f} MB/min")
    print("="*80, flush=True)

    errors = [r for r in results if not r['success']]
    if errors:
        print("\nErrors:")
        for err in errors:
            print(f"  ✗ {err['file']}: {err['error']}")

    print(f"\nArabic files saved to: {ARABIC_DIR.absolute()}", flush=True)


if __name__ == "__main__":
    main()
