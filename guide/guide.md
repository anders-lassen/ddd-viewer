# Blender guide til Erlinord


Programmer:
- [Blender](https://www.blender.org/)
- [BlenderKit](https://www.blenderkit.com/)
- [Batch import af OBJ](io_batch_import_objs.py)
- [Delete Material Duplicates](Eliminate_Material_Duplicates.py)


## Batch import af .obj:
* Installer ```io_batch_import_objs.py``` ved at;
    - Blender > Edit > Preferences 
        
        ![alt text](image.png)
    - Add-ons > Install > Åben ```io_batch_import_objs.py``` > Aktiver ```(2)```
        
        ![alt text](image-1.png)

    - File > Import > Wavefront Batch 
        
        ![alt text](image-2.png)


## Slet alle dupletter af materiale:
* Installer ```Eliminate_Material_Duplicates.py``` ved at;
    - Blender > Edit > Preferences 
        
        ![alt text](image.png)
    - Add-ons > Install > Åben ```io_batch_import_objs.py``` > Aktiver ```(2)```
        
        ![alt text](image-3.png)

* Bruges ved at vælge alle parter (genvej: ```a```)

    - ![alt text](image-4.png)

## BlenderKit

Følg vejledningen på https://www.blenderkit.com/

## Renderinger

![alt text](image-6.png)

- <span style="color:red">**Rød**</span> viser 'Wireframe'
- <span style="color:green">**Grøn**</span> viser 'Viewport'
- <span style="color:blue">**Blå**</span> er 'Materiale Preview'
- <span style="color:yellow">**Gul**</span> aktiverer 'Render view' 

### Kamera'er
- Marker kameraet, og tryk ```numpad 0```
    
    ![alt text](image-11.png)
- Kan derefter indstilles til Perspective eller Orthographic
    
    ![alt text](image-12.png)


### Indstillinger til Renderinger:
- Brug ```Cycles```, den er bedst.

    ![Cycles](image-8.png)
- Indstillinger til output

    ![Output](image-9.png)

- ```Viewport Render Image``` giver billeder som nedenfor
    
    ![alt text](image-10.png)
    ![alt text](002.png)

- For lave renderinger, som benytter materiale og tager godt med tid. ```Render``` > ```Render Image```. Brug ```alt + s``` for at gemme billeder i Renderings vinduet.

    ![alt text](image-13.png)


Alt findes som videoer på youtube, og google er din ven. Husk at download nok RAM.