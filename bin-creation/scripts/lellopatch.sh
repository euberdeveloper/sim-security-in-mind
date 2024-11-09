#!/bin/bash

# Syntax ./scripts/lellopatch.sh <prefix> [rpath] [use_force_rpath] [...folders]

# The first argument is the prefix, so the "root" folder for this script
prefix=$1
echo "Prefix is ${prefix}"

# The second argument is the path that will be used ar rpath, by default '$ORIGIN/../lib'
rpath=$2
if [ -z "$rpath" ] || [ "$rpath" == "default" ]; then
    rpath='$ORIGIN/../lib'
fi
echo "Rpath is ${rpath}"

# The third argument says if rpath should be used instead of runpath (true for yes, false for no), by default false
use_force_rpath=$3
if [ -z "$use_force_rpath" ] || [ "$use_force_rpath" == "false" ] || [ "$use_force_rpath" == "default" ]; then
    use_force_rpath=false
else
    use_force_rpath=true
fi
echo "Use rpath is ${use_force_rpath}"

# The rest of the arguments are the folders to patch, by default bin and lib
folders=( ${@:4} )
if [ ${#folders[@]} -eq 0 ]; then
    folders=(bin lib)
fi
echo "Folders to patch: ${folders[@]}"

use_force_rpath_arg=""
if [ "$use_force_rpath" == "true" ]; then
    use_force_rpath_arg="--force-rpath"
fi

for folder in ${folders[@]}; do
    echo "Patching ${folder}"
    cd ${prefix}/${folder}
    for f in * ; do
        /usr/bin/file -bi $f | /bin/grep application/x-sharedlib >/dev/null 2>&1
        if [ "$use_force_rpath" == "true" ]; then
            /usr/bin/patchelf --remove-rpath $f
        fi
        /usr/bin/patchelf $use_force_rpath_arg --set-rpath $rpath $f
    done
done

# Keep this for returning code 0
echo "Patched"