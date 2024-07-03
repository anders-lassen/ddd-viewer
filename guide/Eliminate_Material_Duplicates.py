bl_info = {
    "name": "Eliminate duplicate materials for Inventor imported objects",
    "author": "IlikeBlender",
    "version": (1, 0),
    "blender": (2, 80, 0),
    "location": "Properties > Material properties",
    "description": "Replace material duplicates ( _1, _2, .001, .002, etc) with a single one",
    "warning": "",
    "doc_url": "",
    "category": "",
}




import bpy

def main(context):
    #--- Search for mat. slots in all objects
    mats = bpy.data.materials

    for obj in bpy.data.objects:
        for slot in obj.material_slots:

            # Get the material name as 3-tuple (base, separator, extension)
            (base, sep, ext) = slot.name.rpartition('.')

            # Replace the numbered duplicate with the original if found
            if ext.isnumeric():
                if base in mats:
                    print("  For object '%s' replace '%s' with '%s'" % (obj.name, slot.name, base))
                    slot.material = mats.get(base)
                    bpy.ops.outliner.orphans_purge()
                
    for obj in bpy.data.objects:
        for slot in obj.material_slots:

            # Get the material name as 3-tuple (base, separator, extension)
            (base, sep, ext) = slot.name.rpartition('_')

            # Replace the numbered duplicate with the original if found
            if ext.isnumeric():
                if base in mats:
                    print("  For object '%s' replace '%s' with '%s'" % (obj.name, slot.name, base))
                    slot.material = mats.get(base)
                    bpy.ops.outliner.orphans_purge()


class SimpleOperator(bpy.types.Operator):
    bl_idname = "object.simple_operator"
    bl_label = "DELETE DUPLICATES"



    def execute(self, context):
        main(context)
        return {'FINISHED'}





class LayoutDemoPanel(bpy.types.Panel):
    bl_label = "Delete Material Duplicates"
    bl_idname = "DEL_MAT_DUP"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = "Delete Material Duplicates"
    
    def draw(self, context):
        layout = self.layout
        scene = context.scene
        row = layout.row()
        row.scale_y = 2.0
        row.operator("object.simple_operator", icon='TRASH')


def register():
    bpy.utils.register_class(SimpleOperator)
    bpy.utils.register_class(LayoutDemoPanel)
  
def unregister():
    bpy.utils.unregister_class(SimpleOperator)
    bpy.utils.unregister_class(LayoutDemoPanel)

if __name__ == "__main__":
    register()