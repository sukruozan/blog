#!/bin/bash

# Bulunduğunuz klasördeki çift uzantılı dosyaları tarar ve düzeltir
for file in *; do
    # Örn: .JPG.jpg, .jpg.jpg, .JPEG.jpeg gibi çift uzantı kalıplarını yakalar
    if [[ "$file" =~ \.(jpg|JPG|jpeg|JPEG)\.(jpg|JPG|jpeg|JPEG)$ ]]; then
        # Son uzantıyı kırparak orijinal tek uzantılı halini elde eder
        newname="${file%.*}"
        
        # Hedef isimde başka bir dosya yoksa taşıma işlemini gerçekleştir
        if [ ! -e "$newname" ]; then
            mv -- "$file" "$newname"
            echo "Düzeltildi: '$file' -> '$newname'"
        else
            echo "Atlandı (aynı isimde dosya var): '$file'"
        fi
    fi
done

echo "İşlem tamamlandı."
